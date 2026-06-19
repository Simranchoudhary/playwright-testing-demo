# Playwright Testing Demo

UI and API test suite built with [Playwright](https://playwright.dev/) and TypeScript.

## What's tested

| Layer | Target | Tests |
|-------|--------|-------|
| UI    | [TodoMVC Demo](https://demo.playwright.dev/todomvc) | Add, complete, filter, clear todos |
| API   | [JSONPlaceholder](https://jsonplaceholder.typicode.com) | CRUD on posts, user + nested routes |

## Getting started

```bash
npm install
npm run install:browsers   # downloads Chromium, Firefox, WebKit
npm test                   # run all tests
```

## Run specific suites

```bash
npm run test:ui      # UI tests only
npm run test:api     # API tests only
npm run test:headed  # UI tests with visible browser
npm run report       # open HTML report after a run
```

## Project structure

```
tests/
  fixtures/        # shared page object / custom fixtures
  ui/              # browser-based UI tests
  api/             # HTTP API tests
playwright.config.ts
```

## CI

Add this to your GitHub Actions workflow:

```yaml
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
  with:
    node-version: 20
- run: npm ci
- run: npx playwright install --with-deps
- run: npm test
```
