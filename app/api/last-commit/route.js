let cache = {
  data: null,
  timestamp: null,
  isStale: false,
};

let inFlightFetch = null;

const CACHE_TTL = 10 * 60 * 1000;
const STALE_TTL = 15 * 60 * 1000;

async function fetchLastCommitFromGitHub() {
  const githubToken = process.env.GITHUB_TOKEN;
  const headers = { Accept: "application/vnd.github.v3+json" };
  if (githubToken) headers["Authorization"] = `token ${githubToken}`;

  try {
    const eventsResponse = await fetch(
      "https://api.github.com/users/BrunoAseff/events/public?per_page=30",
      { headers, next: { revalidate: 0 } }
    );
    const events = await eventsResponse.json();

    const lastPush = events.find((e) => e.type === "PushEvent");
    if (!lastPush) return null;

    const repoName = lastPush.repo.name;
    let targetSha = lastPush.payload.head;

    const commitRes = await fetch(
      `https://api.github.com/repos/${repoName}/commits/${targetSha}`,
      { headers, next: { revalidate: 0 } }
    );
    let commitData = await commitRes.json();

    if (
      commitData.commit.message.startsWith("Merge") &&
      commitData.parents?.length > 1
    ) {
      const workSha = commitData.parents[1].sha;
      const workRes = await fetch(
        `https://api.github.com/repos/${repoName}/commits/${workSha}`,
        { headers, next: { revalidate: 0 } }
      );
      commitData = await workRes.json();
    }

    return {
      sha: commitData.sha.substring(0, 7),
      message: commitData.commit.message.split("\n")[0],
      url: commitData.html_url,
      repo: {
        name: repoName.split("/")[1],
        full_name: repoName,
      },
      date: commitData.commit.author.date,
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getCommitWithDeduplication() {
  if (inFlightFetch) {
    return await inFlightFetch;
  }

  inFlightFetch = fetchLastCommitFromGitHub();

  try {
    const data = await inFlightFetch;

    if (data) {
      cache.data = data;
      cache.timestamp = Date.now();
      cache.isStale = false;
    }

    return data;
  } catch (error) {
    throw error;
  } finally {
    inFlightFetch = null;
  }
}

export async function GET() {
  const now = Date.now();

  if (cache.data && cache.timestamp) {
    const age = now - cache.timestamp;

    if (age < CACHE_TTL) {
      return Response.json(cache.data, {
        headers: {
          "Cache-Control": `public, s-maxage=${Math.floor(
            (CACHE_TTL - age) / 1000
          )}, stale-while-revalidate=${Math.floor((STALE_TTL - age) / 1000)}`,
        },
      });
    }

    if (age < STALE_TTL) {
      if (!cache.isStale && !inFlightFetch) {
        cache.isStale = true;

        getCommitWithDeduplication().catch((error) => {
          console.error("Background refresh failed:", error);
          cache.isStale = false;
        });
      }

      return Response.json(cache.data, {
        headers: {
          "Cache-Control": `public, s-maxage=0, stale-while-revalidate=${Math.floor(
            (STALE_TTL - age) / 1000
          )}`,
        },
      });
    }
  }

  try {
    const data = await getCommitWithDeduplication();

    if (data) {
      return Response.json(data, {
        headers: {
          "Cache-Control": `public, s-maxage=${Math.floor(
            CACHE_TTL / 1000
          )}, stale-while-revalidate=${Math.floor(STALE_TTL / 1000)}`,
        },
      });
    }

    return Response.json({ error: "No commits found" }, { status: 404 });
  } catch (error) {
    if (cache.data) {
      return Response.json(cache.data, {
        headers: {
          "Cache-Control": "public, s-maxage=0, stale-while-revalidate=60",
        },
      });
    }

    return Response.json(
      { error: error.message || "Failed to fetch last commit" },
      { status: 500 }
    );
  }
}
