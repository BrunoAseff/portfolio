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
type PushEvent = {
  type: string;
  repo?: { name?: string };
  created_at?: string;
  payload?: { head?: string };
};
export async function collectPublicActivity(
  get: GetJson,
  checkedAt = new Date().toISOString(),
): Promise<ActivitySnapshot> {
  let push: PushEvent | undefined;
  for (let page = 1; page <= 3; page++) {
    const events = await get(`/users/BrunoAseff/events/public?per_page=100&page=${page}`);
    if (!Array.isArray(events)) throw new Error("Unexpected events response");
    push = (events as PushEvent[]).find(
      (e) => e.type === "PushEvent" && e.repo?.name && typeof e.payload?.head === "string",
    );
    if (push || events.length < 100) break;
  }
  if (!push?.repo?.name || !push.payload?.head) throw new Error("No recent public push found");
  const repository = push.repo.name,
    sha = push.payload.head;
  if (!/^BrunoAseff\/[a-zA-Z0-9_.-]+$/i.test(repository) || !/^[a-f0-9]{40}$/i.test(sha))
    throw new Error("Invalid public event");
  const repo = (await get(`/repos/${repository}`)) as { private?: boolean };
  if (repo.private !== false) throw new Error("Repository is not public");
  const commit = (await get(`/repos/${repository}/commits/${sha}`)) as {
    sha?: string;
    html_url?: string;
    commit?: { message?: string; committer?: { date?: string } };
  };
  const snapshot = {
    repository,
    sha,
    message: commit.commit?.message?.split("\n")[0] ?? "",
    url: commit.html_url ?? "",
    date: commit.commit?.committer?.date ?? "",
    pushDate: push.created_at ?? null,
    checkedAt,
    source: "github-public-events",
  };
  if (commit.sha !== sha || !isActivitySnapshot(snapshot))
    throw new Error("Invalid commit response");
  return snapshot;
}

export function selectActivityFallback(...sources: unknown[]): ActivitySnapshot | null {
  return (
    sources
      .filter(isActivitySnapshot)
      .sort((a, b) => Date.parse(b.checkedAt) - Date.parse(a.checkedAt))[0] ?? null
  );
}
