import { request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalSetup(): Promise<void> {
  const apiURL = process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com';
  const uiURL = process.env.UI_BASE_URL ?? 'https://demo.playwright.dev';

  const context = await request.newContext();

  // API health check
  const apiResponse = await context.get(`${apiURL}/posts/1`);
  if (!apiResponse.ok()) {
    await context.dispose();
    throw new Error(`API health check failed: ${apiURL}/posts/1 returned ${apiResponse.status()}`);
  }

  // UI health check
  const uiResponse = await context.get(`${uiURL}/todomvc`);
  if (!uiResponse.ok()) {
    await context.dispose();
    throw new Error(`UI health check failed: ${uiURL}/todomvc returned ${uiResponse.status()}`);
  }

  await context.dispose();
  console.log('✓ Global setup: API and UI health checks passed');
}

export default globalSetup;
