# Public test case schema

Each dataset file contains:

- `schemaVersion` - export schema date.
- `generatedAt` - ISO timestamp of this public export.
- `source` - public site, methodology and exact source revision.
- `source.commitSha` and `source.workingTree` - exact source revision and whether uncommitted tracked changes existed.
- `cases[]` - deterministic golden cases.

Each case contains:

- `id` - stable machine-readable identifier.
- `title` - human-readable scenario title.
- `category` - `fintech`, `engineering` or `health`.
- `calculator` - Edinici.ru tool slug.
- `sourcePath` - public route on https://edinici.ru.
- `input` - sanitized user-level input parameters.
- `expected` - expected output values.
- `tolerance` - numeric tolerance used when comparing implementations.
- `oracle.type` - `engine_regression`, `normative_manual`, `official_example` or `independent_implementation`.
- `oracle.independentFromRuntime` - whether expected was produced independently of the production runtime.
- `oracle.reviewedAt`, `methodologyVersion`, `calculatorVersion` - provenance versions and review date.
- `oracle.source` - reproducible source and section when the oracle is stronger than an engine regression.
- `standards` - optional references to standards or public methodology.

The schema intentionally excludes private formulas, source code and Excel model internals.
