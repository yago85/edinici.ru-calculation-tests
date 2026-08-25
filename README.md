# Edinici.ru Calculation Test Cases and Methodology

[Edinici.ru](https://edinici.ru) is a Russian-language service for calculators, unit converters and finance tools. This repository contains public golden test cases used to audit the numerical behaviour of selected Edinici.ru calculators.

## English

### What is published here

This repository publishes input-to-expected-output datasets for external inspection. The datasets are exported from the same codebase that powers Edinici.ru, but they do not include the private calculation engines, Excel builders or internal implementation details.

Each case has an `oracle` object. The current production-engine outputs are marked `engine_regression` and `independentFromRuntime: false`: they detect later regressions but do not independently prove that the formula is correct. A stronger label is allowed only with reproducible provenance.

Current public export:

- Golden cases: 66
- Source commit: 255b860ab02be47c8be804ba92caf1f13beac01e (clean working tree at export)
- Source release verification: passed at 2026-08-25T12:05:22.267Z
- Methodology page: https://edinici.ru/methodology#avtotesty

### Accuracy model

1. Explicit provenance. Every expected result states whether it came from the production engine, a manual normative derivation, an official example or an independent implementation.
2. Isolated datasets. Financial, engineering and health calculators are represented by deterministic inputs and expected results.
3. Source-linked context. Standards explain the method but do not automatically make an engine-generated expected value independent.
4. Privacy-first product architecture. Edinici.ru calculators are designed so user-entered calculation parameters are processed locally in the browser where the tool permits it. This repository validates numerical outputs, not user telemetry.

### Repository structure

- `tests/fintech/` - deposits, loans, mortgages, auto credit and salary golden cases.
- `tests/engineering/` - unit conversion golden cases.
- `tests/health/` - BMI, body-fat, calorie, water and pregnancy calculator golden cases.
- `tests/summary.json` - export summary, source revision and publication status.
- `scripts/validate-golden-cases.mjs` - dependency-free schema sanity check.

## Русский

### Что опубликовано

В репозитории опубликованы пары входных данных и ожидаемых результатов для внешнего разбора. Данные экспортируются из той же кодовой базы, которая используется на Edinici.ru, но без публикации приватных вычислительных движков, Excel-сборщиков и внутренних деталей реализации.

У каждого кейса есть объект `oracle`. Результаты текущего production-движка обозначены как `engine_regression` и `independentFromRuntime: false`: они обнаруживают последующие регрессии, но не являются независимым доказательством правильности формулы. Более сильный уровень допускается только с воспроизводимым provenance.

Текущий публичный экспорт:

- Golden cases: 66
- Commit исходного проекта: 255b860ab02be47c8be804ba92caf1f13beac01e (рабочее дерево при экспорте: clean)
- Проверка исходной версии перед экспортом: пройдена, 2026-08-25T12:05:22.267Z
- Страница методологии: https://edinici.ru/methodology#avtotesty

### Архитектура точности

1. Явное происхождение. Для каждого expected указано, получен ли он production-движком, ручным нормативным выводом, официальным примером или независимой реализацией.
2. Изолированные датасеты. Для финансовых, инженерных и health-калькуляторов фиксируются входные параметры и ожидаемые результаты.
3. Контекст источников. Ссылка на норму объясняет метод, но сама по себе не делает ожидаемое значение, созданное движком, независимым.
4. Privacy-first архитектура продукта. Калькуляторы Edinici.ru спроектированы так, чтобы пользовательские параметры расчёта обрабатывались локально в браузере там, где это допускает инструмент. Этот репозиторий проверяет числовые результаты, а не телеметрию пользователей.

## Report a discrepancy / Сообщить о расхождении

If a calculator result disagrees with the published methodology or these golden cases, open an issue: https://github.com/yago85/edinici.ru-calculation-tests/issues/new/choose. Include the calculator link, the inputs, the expected result with its basis and the actual result.

Если результат калькулятора расходится с опубликованной методикой или golden-кейсами, откройте issue по ссылке выше. Приложите ссылку на калькулятор, входные данные, ожидаемый результат с обоснованием и фактический результат. Подтверждённые расхождения исправляются в расчётном движке и фиксируются новым golden-кейсом.

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
