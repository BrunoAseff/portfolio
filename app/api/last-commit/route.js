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
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };
  
    if (githubToken) {
      headers['Authorization'] = `token ${githubToken}`;
    }
  
    try {
      const eventsResponse = await fetch(
        'https://api.github.com/users/BrunoAseff/events/public?per_page=10',
        { headers, next: { revalidate: 0 } }
      );
  
      if (!eventsResponse.ok) {
        if (eventsResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded');
        }
        throw new Error(`GitHub API error: ${eventsResponse.status}`);
      }
  
      const events = await eventsResponse.json();
      
      let commitSha = null;
      let repoName = null;
  
      for (const event of events) {
        if (event.type === 'PushEvent' && event.payload?.commits?.length > 0) {
          const validCommit = [...event.payload.commits].reverse().find(commit => 
            !commit.message.startsWith('Merge pull request')
          );
  
          if (validCommit) {
            commitSha = validCommit.sha;
            repoName = event.repo.name;
            break;
          }
        }
      }
  
      if (!commitSha) {
        return null;
      }
  
      const commitResponse = await fetch(
        `https://api.github.com/repos/${repoName}/commits/${commitSha}`,
        { headers, next: { revalidate: 0 } }
      );
  
      if (!commitResponse.ok) {
        throw new Error(`Failed to fetch commit: ${commitResponse.status}`);
      }
  
      const commitData = await commitResponse.json();
  
      return {
        sha: commitData.sha.substring(0, 7),
        message: commitData.commit.message.split('\n')[0],
        url: commitData.html_url,
        repo: {
          name: repoName.split('/')[1],
          full_name: repoName,
        },
        date: commitData.commit.author.date,
      };
    } catch (error) {
      console.error('Error fetching last commit from GitHub:', error);
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
        'Cache-Control': `public, s-maxage=${Math.floor((CACHE_TTL - age) / 1000)}, stale-while-revalidate=${Math.floor((STALE_TTL - age) / 1000)}`,
        },
    });
    }

    if (age < STALE_TTL) {
    if (!cache.isStale && !inFlightFetch) {
        cache.isStale = true;
        
        getCommitWithDeduplication()
        .catch((error) => {
            console.error('Background refresh failed:', error);
            cache.isStale = false;
        });
    }

    return Response.json(cache.data, {
        headers: {
        'Cache-Control': `public, s-maxage=0, stale-while-revalidate=${Math.floor((STALE_TTL - age) / 1000)}`,
        },
    });
    }
}

try {
    const data = await getCommitWithDeduplication();
    
    if (data) {
    return Response.json(data, {
        headers: {
        'Cache-Control': `public, s-maxage=${Math.floor(CACHE_TTL / 1000)}, stale-while-revalidate=${Math.floor(STALE_TTL / 1000)}`,
        },
    });
    }

    return Response.json(
    { error: 'No commits found' },
    { status: 404 }
    );
} catch (error) {
    if (cache.data) {
    return Response.json(cache.data, {
        headers: {
        'Cache-Control': 'public, s-maxage=0, stale-while-revalidate=60',
        },
    });
    }

    return Response.json(
    { error: error.message || 'Failed to fetch last commit' },
    { status: 500 }
    );
}
}