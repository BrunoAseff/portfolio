import { describe, it, expect } from "vite-plus/test";
import { collectPublicActivity, isActivitySnapshot, selectActivityFallback } from "./activity";
const baseline = {
  repository: "BrunoAseff/portfolio",
  sha: "b".repeat(40),
  url: `https://github.com/BrunoAseff/portfolio/commit/${"b".repeat(40)}`,
  message: "Verified change",
  date: "2026-11-10T10:00:00Z",
  checkedAt: "2026-11-11T10:00:00Z",
  pushDate: null,
  source: "test",
};
const sha = "a".repeat(40),
  repo = "BrunoAseff/portfolio";
describe("public activity contract", () => {
  it("rejects malformed or untrusted URLs", () => {
    expect(isActivitySnapshot({ ...baseline, url: "https://example.com/commit" })).toBe(false);
    expect(isActivitySnapshot({ ...baseline, date: "invalid" })).toBe(false);
    expect(isActivitySnapshot({ ...baseline, repository: "someone/secret" })).toBe(false);
  });
  it("resolves the push head instead of assuming payload.commits or commit authorship", async () => {
    const calls: string[] = [];
    const result = await collectPublicActivity(async (path) => {
      calls.push(path);
      if (path.startsWith("/users/"))
        return [
          {
            type: "PushEvent",
            repo: { name: repo },
            payload: { head: sha },
            created_at: "2026-11-11T10:00:00Z",
          },
        ];
      if (path === `/repos/${repo}`) return { private: false };
      return {
        sha,
        html_url: `https://github.com/${repo}/commit/${sha}`,
        commit: {
          message: "A real change\n\nDetails",
          committer: { date: "2026-11-10T10:00:00Z" },
        },
      };
    }, "2026-11-11T11:00:00Z");
    expect(result.message).toBe("A real change");
    expect(result.date).not.toBe(result.pushDate);
    expect(calls).toHaveLength(3);
    expect(isActivitySnapshot(result)).toBe(true);
  });
  it("refuses a repository which has become private", async () => {
    await expect(
      collectPublicActivity(async (path) =>
        path.startsWith("/users/")
          ? [{ type: "PushEvent", repo: { name: repo }, payload: { head: sha } }]
          : { private: true },
      ),
    ).rejects.toThrow("not public");
  });
});

describe("activity failure fallback", () => {
  it("keeps the newest valid snapshot without inventing a fresh timestamp", () => {
    const older = { ...baseline, checkedAt: "2026-11-01T10:00:00Z" };
    expect(selectActivityFallback(older, baseline)).toBe(baseline);
    expect(selectActivityFallback(null, { ...baseline, url: "invalid" }, baseline)?.checkedAt).toBe(
      "2026-11-11T10:00:00Z",
    );
  });
  it("allows the empty state when no trustworthy snapshot exists", () => {
    expect(selectActivityFallback(null, {})).toBe(null);
  });
});
