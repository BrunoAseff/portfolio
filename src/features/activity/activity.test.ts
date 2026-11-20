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
  it("picks the newest non-merge commit across recently pushed public repositories", async () => {
    const other = "BrunoAseff/lazuli",
      older = "c".repeat(40),
      merge = "d".repeat(40);
    const commit = (repository: string, id: string, date: string, parents = 1) => ({
      sha: id,
      html_url: `https://github.com/${repository}/commit/${id}`,
      parents: Array.from({ length: parents }, () => ({})),
      commit: { message: `Change ${id[0]}\n\nDetails`, committer: { date } },
    });
    const result = await collectPublicActivity(async (path) => {
      if (path.startsWith("/users/"))
        return [
          { full_name: "BrunoAseff/forked", private: false, fork: true },
          { full_name: other, private: false, pushed_at: "2026-11-20T05:00:20Z" },
          { full_name: repo, private: false, pushed_at: "2026-11-16T00:00:00Z" },
          { full_name: "BrunoAseff/hidden", private: true },
        ];
      if (path.startsWith(`/repos/${other}/`))
        return [
          commit(other, merge, "2026-11-20T05:00:20Z", 2),
          commit(other, sha, "2026-11-20T04:59:15Z"),
        ];
      if (path.startsWith(`/repos/${repo}/`)) return [commit(repo, older, "2026-11-15T10:00:00Z")];
      throw new Error(`Unexpected ${path}`);
    }, "2026-11-20T06:00:00Z");
    expect(result.repository).toBe(other);
    expect(result.sha).toBe(sha);
    expect(result.message).toBe("Change a");
    expect(isActivitySnapshot(result)).toBe(true);
  });
  it("fails instead of inventing activity when no public commit is available", async () => {
    await expect(
      collectPublicActivity(async (path) =>
        path.startsWith("/users/") ? [{ full_name: repo, private: true }] : [],
      ),
    ).rejects.toThrow("No recent public commit");
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
