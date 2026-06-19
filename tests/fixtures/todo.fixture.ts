import { test as base, Page } from '@playwright/test';

class TodoPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async addTodo(text: string) {
    await this.page.getByPlaceholder('What needs to be done?').fill(text);
    await this.page.keyboard.press('Enter');
  }

  async completeTodo(text: string) {
    await this.page.getByText(text).locator('..').getByRole('checkbox').check();
  }

  async deleteTodo(text: string) {
    const item = this.page.getByText(text).locator('..');
    await item.hover();
    await item.getByRole('button', { name: '×' }).click();
  }

  getTodoItems() {
    return this.page.getByTestId('todo-item');
  }
}

export const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
});

export { expect } from '@playwright/test';
