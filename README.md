# Playwright Testing Framework

A production-ready UI and API test automation framework built with **Playwright** and **TypeScript**, following the **Page Object Model (POM)** design pattern.

---

## Features

- **Page Object Model** — clean separation between test logic and page interactions
- **Typed API clients** — reusable API layer with full TypeScript types
- **Custom fixtures** — dependency-injected page objects and API clients per test
- **Centralized test data** — shared constants used across all tests
- **HTML reports** — visual test results with screenshots and traces on failure
- **GitHub Actions CI** — runs automatically on every push and pull request

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & API testing |
| TypeScript | Type safety across the entire framework |
| JSONPlaceholder | REST API test target |
| TodoMVC | UI test target |
| GitHub Actions | CI/CD pipeline |

---

## Project structure

```
src/
├── pages/
│   ├── BasePage.ts        # Abstract base with shared page methods
│   └── TodoPage.ts        # Page Object for the TodoMVC app
├── api/
│   ├── BaseApi.ts         # Abstract base with HTTP method wrappers
│   ├── PostsApi.ts        # API client for /posts endpoints
│   └── UsersApi.ts        # API client for /users endpoints
├── types/
│   ├── api.types.ts       # Interfaces: Post, User, Address, Company
│   └── todo.types.ts      # Interfaces: TodoItem, FilterType
└── utils/
    └── testData.ts        # Centralized test data constants

tests/
├── fixtures/
│   └── index.ts           # Custom Playwright fixtures (DI for POM + API clients)
├── ui/
│   └── todo.spec.ts       # 12 UI tests across 5 describe groups
└── api/
    ├── posts.spec.ts      # 7 tests covering full CRUD on /posts
    └── users.spec.ts      # 4 tests covering /users and nested routes

.github/
└── workflows/
    └── ci.yml             # GitHub Actions pipeline
```

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npm run install:browsers

# 3. Run all tests
npm test
```

---

## Available scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (UI + API) |
| `npm run test:ui` | UI tests only |
| `npm run test:api` | API tests only |
| `npm run test:headed` | Run UI tests with a visible browser |
| `npm run report` | Open the last HTML test report |

---

## Design patterns used

### Page Object Model
Each page is encapsulated in a class that exposes **actions** (`addTodo`, `filterBy`) and **assertions** (`assertTodoCount`, `assertTodoCompleted`). Tests never interact with locators directly.

### API Client abstraction
`BaseApi` provides generic HTTP method wrappers. `PostsApi` and `UsersApi` extend it with endpoint-specific methods, keeping tests clean and readable.

### Custom Fixtures
Playwright fixtures inject `todoPage`, `postsApi`, and `usersApi` into tests automatically — no manual setup or teardown needed.

```typescript
test('adds a todo', async ({ todoPage }) => {
  await todoPage.addTodo('Write tests');
  await todoPage.assertTodoCount(1);
});
```

---

## CI / CD

Tests run automatically via **GitHub Actions** on every push and pull request. The HTML report is uploaded as a build artifact and retained for 14 days.
