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

const summary = JSON.parse(readFileSync(join(testsDir, "summary.json"), "utf8"));
if (
  summary.releaseEvidence?.status !== "passed" ||
  !Number.isFinite(Date.parse(summary.releaseEvidence?.verifiedAt)) ||
  !/^[a-f0-9]{40}$/.test(summary.sourceRevision?.commitSha ?? "") ||
  summary.sourceRevision?.workingTree !== "clean" ||
  summary.releaseEvidence?.sourceSha !== summary.sourceRevision?.commitSha ||
  !/^[a-f0-9]{64}$/.test(summary.releaseEvidence?.qaReportSha256 ?? "") ||
  !/^v[0-9A-Za-z._-]+$/.test(summary.releaseEvidence?.release ?? "")
) throw new Error("summary.json: incomplete bound release evidence");

const files = walk(testsDir).filter((path) => path.endsWith(".json"));
let cases = 0;

for (const file of files) {
  const payload = JSON.parse(readFileSync(file, "utf8"));
  if (file.endsWith("summary.json")) continue;
  if (payload.source?.commitSha !== summary.sourceRevision.commitSha ||
      payload.source?.workingTree !== "clean")
    throw new Error(`${file}: source differs from release summary`);
  if (!payload.schemaVersion || !Array.isArray(payload.cases)) {
    throw new Error(`${file}: expected schemaVersion and cases[]`);
  }
  for (const item of payload.cases) {
    if (!item.id || !item.title || !item.category || !item.calculator) {
      throw new Error(`${file}: incomplete case metadata`);
    }
    if (!item.input || !item.expected || !item.tolerance || !item.oracle) {
      throw new Error(`${file}: case ${item.id} lacks input, expected, tolerance or oracle`);
    }
    const allowedOracleTypes = new Set([
      "engine_regression",
      "normative_manual",
      "official_example",
      "independent_implementation",
    ]);
    if (!allowedOracleTypes.has(item.oracle.type)) {
      throw new Error(`${file}: case ${item.id} has unknown oracle type`);
    }
    if (
      typeof item.oracle.independentFromRuntime !== "boolean" ||
      !item.oracle.reviewedAt ||
      !item.oracle.methodologyVersion ||
      !item.oracle.calculatorVersion
    ) {
      throw new Error(`${file}: case ${item.id} has incomplete oracle provenance`);
    }
    if (
      item.oracle.type === "engine_regression" &&
      item.oracle.independentFromRuntime
    ) {
      throw new Error(`${file}: engine regression cannot be independent from runtime`);
    }
    if (
      item.oracle.type !== "engine_regression" &&
      (!item.oracle.independentFromRuntime || !item.oracle.source?.url)
    ) {
      throw new Error(`${file}: stronger oracle lacks independent source provenance`);
    }
    cases += 1;
  }
}

if (cases !== summary.publicGoldenCases)
  throw new Error("summary.json: golden case count differs from datasets");

console.log(`Validated ${cases} public golden cases across ${files.length - 1} dataset files.`);
