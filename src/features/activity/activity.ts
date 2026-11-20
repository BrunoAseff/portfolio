export type ActivitySnapshot = {
  repository: string;
  sha: string;
  message: string;
  url: string;
  date: string;
  pushDate: string | null;
  checkedAt: string;
  source: string;
};
export function isActivitySnapshot(value: unknown): value is ActivitySnapshot {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  if (typeof v.repository !== "string" || !/^BrunoAseff\/[a-zA-Z0-9_.-]+$/i.test(v.repository))
    return false;
  if (typeof v.sha !== "string" || !/^[a-f0-9]{40}$/i.test(v.sha)) return false;
  if (v.url !== `https://github.com/${v.repository}/commit/${v.sha}`) return false;
  return (
    typeof v.message === "string" &&
    v.message.trim().length > 0 &&
    typeof v.source === "string" &&
    ["date", "checkedAt"].every(
      (k) => typeof v[k] === "string" && Number.isFinite(Date.parse(v[k] as string)),
    ) &&
    (v.pushDate === null ||
      (typeof v.pushDate === "string" && Number.isFinite(Date.parse(v.pushDate))))
  );
}
type GetJson = (path: string) => Promise<unknown>;
type Repository = {
  full_name?: string;
  private?: boolean;
  fork?: boolean;
  archived?: boolean;
  pushed_at?: string;
};
type Commit = {
  sha?: string;
  html_url?: string;
  parents?: unknown[];
  commit?: { message?: string; committer?: { date?: string } };
};
const owner = /^BrunoAseff\/[a-zA-Z0-9_.-]+$/i;

// Public events omit pushes made through merged pull requests, so they cannot be the
// source. The repositories most recently pushed to are read directly instead; within
// each, the newest non-merge commit on the default branch is the real change.
export async function collectPublicActivity(
  get: GetJson,
  checkedAt = new Date().toISOString(),
): Promise<ActivitySnapshot> {
  const repositories = await get("/users/BrunoAseff/repos?type=owner&sort=pushed&per_page=10");
  if (!Array.isArray(repositories)) throw new Error("Unexpected repositories response");
  const candidates = (repositories as Repository[])
    .filter(
      (r) =>
        r.private === false &&
        !r.fork &&
        !r.archived &&
        typeof r.full_name === "string" &&
        owner.test(r.full_name),
    )
    .slice(0, 3);
  let latest: ActivitySnapshot | null = null;
  for (const repo of candidates) {
    const repository = repo.full_name as string;
    const commits = await get(`/repos/${repository}/commits?per_page=30`);
    if (!Array.isArray(commits)) continue;
    const commit = (commits as Commit[]).find(
      (c) => Array.isArray(c.parents) && c.parents.length === 1,
    );
    if (!commit?.sha) continue;
    const snapshot = {
      repository,
      sha: commit.sha,
      message: commit.commit?.message?.split("\n")[0]?.trim() ?? "",
      url: commit.html_url ?? "",
      date: commit.commit?.committer?.date ?? "",
      pushDate: repo.pushed_at ?? null,
      checkedAt,
      source: "github-repositories",
    };
    if (!isActivitySnapshot(snapshot)) continue;
    if (!latest || Date.parse(snapshot.date) > Date.parse(latest.date)) latest = snapshot;
  }
  if (!latest) throw new Error("No recent public commit found");
  return latest;
}

export function selectActivityFallback(...sources: unknown[]): ActivitySnapshot | null {
  return (
    sources
      .filter(isActivitySnapshot)
      .sort((a, b) => Date.parse(b.checkedAt) - Date.parse(a.checkedAt))[0] ?? null
  );
}
