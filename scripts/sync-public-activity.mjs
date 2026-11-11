import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  collectPublicActivity,
  isActivitySnapshot,
  selectActivityFallback,
} from "../src/features/activity/activity.ts";
const destination = new URL("../src/data/github-activity.json", import.meta.url);
const cached = new URL("../.cache/github-activity.json", import.meta.url);
async function readValid(url) {
  try {
    const data = JSON.parse(await readFile(url, "utf8"));
    return isActivitySnapshot(data) ? data : null;
  } catch {
    return null;
  }
}
async function save(url, data) {
  await mkdir(new URL(".", url), { recursive: true });
  const temp = fileURLToPath(url) + ".tmp";
  await writeFile(temp, JSON.stringify(data, null, 2) + "\n");
  await rename(temp, url);
}
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "bruno-aseff-portfolio-build",
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
try {
  const activity = await collectPublicActivity(async (path) => {
    const response = await fetch("https://api.github.com" + path, {
      headers,
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error("GitHub response unavailable");
    return response.json();
  });
  await save(destination, activity);
  await save(cached, activity);
  console.log("Public activity snapshot updated.");
} catch {
  const fallback = selectActivityFallback(
    ...(await Promise.all([readValid(cached), readValid(destination)])),
  );
  if (fallback) {
    await save(destination, fallback);
    console.warn(
      "Activity refresh unavailable; keeping the last valid snapshot and its original checkedAt.",
    );
  } else {
    console.warn("Activity unavailable; rendering the empty state.");
    await save(destination, null);
  }
}
