# Edinici.ru Calculation Test Cases and Methodology

[Edinici.ru](https://edinici.ru) is a Russian-language service for calculators, unit converters and finance tools. This repository contains public golden test cases used to audit the numerical behaviour of selected Edinici.ru calculators.

## English

### What is published here

This repository publishes input-to-expected-output datasets for independent review. The datasets are exported from the same codebase that powers Edinici.ru, but they do not include the private calculation engines, Excel builders or internal implementation details.

Current public export:

- Golden cases: 63
- Internal formula-parity checks referenced by the site: 1084
- Internal QA suites in the latest site report: 50/50
- Internal suites skipped in this public export environment: test:transport-tax:data, test:transport-tax:integrity, test:feedback-admin, test:ops-audit, test:ops-alerts
- Methodology page: https://edinici.ru/methodology#avtotesty

### Accuracy model

1. Isolated datasets. Financial, engineering and health calculators are represented by deterministic inputs and expected results.
2. Source-driven calculations. Financial cases reference Russian tax and banking rules where applicable. Engineering cases use SI conversion factors and GOST 8.417 where applicable. Health cases reference WHO BMI ranges and published Jackson-Pollock/Siri equations.
3. Privacy-first product architecture. Edinici.ru calculators are designed so user-entered calculation parameters are processed locally in the browser where the tool permits it. This repository validates numerical outputs, not user telemetry.

### Repository structure

- `tests/fintech/` - deposits, loans, mortgages, auto credit and salary golden cases.
- `tests/engineering/` - unit conversion golden cases.
- `tests/health/` - BMI and body-fat estimate golden cases.
- `tests/summary.json` - export summary and QA counters.
- `scripts/validate-golden-cases.mjs` - dependency-free schema sanity check.

## Русский

### Что опубликовано

В репозитории опубликованы пары входных данных и эталонных результатов для внешней проверки точности. Данные экспортируются из той же кодовой базы, которая используется на Edinici.ru, но без публикации приватных вычислительных движков, Excel-сборщиков и внутренних деталей реализации.

Текущий публичный экспорт:

- Golden cases: 63
- Внутренних formula-parity проверок, на которые ссылается сайт: 1084
- Наборов QA в последнем отчёте сайта: 50/50
- Внутренние наборы, пропущенные в окружении public export: test:transport-tax:data, test:transport-tax:integrity, test:feedback-admin, test:ops-audit, test:ops-alerts
- Страница методологии: https://edinici.ru/methodology#avtotesty

### Архитектура точности

1. Изолированные датасеты. Для финансовых, инженерных и health-калькуляторов фиксируются входные параметры и ожидаемые результаты.
2. Привязка к источникам. Финансовые кейсы учитывают применимые правила налоговых и банковских расчётов РФ. Инженерные кейсы используют коэффициенты СИ и ГОСТ 8.417 там, где это применимо. Health-кейсы опираются на диапазоны ИМТ ВОЗ и опубликованные уравнения Jackson-Pollock/Siri.
3. Privacy-first архитектура продукта. Калькуляторы Edinici.ru спроектированы так, чтобы пользовательские параметры расчёта обрабатывались локально в браузере там, где это допускает инструмент. Этот репозиторий проверяет числовые результаты, а не телеметрию пользователей.

## Verification

Run the lightweight repository check:

```bash
node scripts/validate-golden-cases.mjs
```

The public datasets are generated from the main Edinici.ru repository by:

```bash
npm run export:public-tests
```

## Contacts

For methodology questions or audit requests, see https://edinici.ru/about.
