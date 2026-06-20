import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  globalSetup: require.resolve('./global-setup'),

  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'ui-chromium',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL ?? 'https://demo.playwright.dev',
      },
    },
    {
      name: 'ui-firefox',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.UI_BASE_URL ?? 'https://demo.playwright.dev',
      },
    },
    {
      name: 'ui-webkit',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.UI_BASE_URL ?? 'https://demo.playwright.dev',
      },
    },
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
      },
    },
  ],
});
