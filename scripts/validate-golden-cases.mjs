#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const testsDir = join(root, "tests");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(testsDir).filter((path) => path.endsWith(".json"));
let cases = 0;

for (const file of files) {
  const payload = JSON.parse(readFileSync(file, "utf8"));
  if (file.endsWith("summary.json")) continue;
  if (!payload.schemaVersion || !Array.isArray(payload.cases)) {
    throw new Error(`${file}: expected schemaVersion and cases[]`);
  }
  for (const item of payload.cases) {
    if (!item.id || !item.title || !item.category || !item.calculator) {
      throw new Error(`${file}: incomplete case metadata`);
    }
    if (!item.input || !item.expected || !item.tolerance) {
      throw new Error(`${file}: case ${item.id} lacks input, expected or tolerance`);
    }
    cases += 1;
  }
}

console.log(`Validated ${cases} public golden cases across ${files.length - 1} dataset files.`);
