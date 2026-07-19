# Public test case schema

Each dataset file contains:

- `schemaVersion` - export schema date.
- `generatedAt` - ISO timestamp of this public export.
- `source` - public site and QA summary metadata.
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
- `standards` - optional references to standards or public methodology.

The schema intentionally excludes private formulas, source code and Excel model internals.
