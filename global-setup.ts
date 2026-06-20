import { chromium, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup(): Promise<void> {
  const apiURL = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
  const uiURL = process.env.UI_BASE_URL ?? 'https://demo.playwright.dev';

  // API health check
  const apiContext = await request.newContext({ baseURL: apiURL });
  const apiResponse = await apiContext.get('/posts/1');
  if (!apiResponse.ok()) {
    await apiContext.dispose();
    throw new Error(`API health check failed: ${apiURL}/posts/1 returned ${apiResponse.status()}`);
  }
  await apiContext.dispose();

  // UI health check
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const uiResponse = await page.goto(`${uiURL}/todomvc`);
  if (!uiResponse?.ok()) {
    await browser.close();
    throw new Error(`UI health check failed: ${uiURL}/todomvc is not reachable`);
  }
  await browser.close();

  console.log('✓ Global setup: API and UI health checks passed');
}

export default globalSetup;
