import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'ui',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://demo.playwright.dev/todomvc',
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
      },
    },
  ],
});
