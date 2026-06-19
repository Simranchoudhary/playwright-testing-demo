import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { FilterType, TodoItem } from '../types/todo.types';

export class TodoPage extends BasePage {
  // Locators
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly itemCount: Locator;
  readonly clearCompletedBtn: Locator;
  readonly toggleAllCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.newTodoInput = page.locator('.new-todo');
    this.todoItems = page.getByTestId('todo-item');
    this.itemCount = page.locator('.todo-count');
    this.clearCompletedBtn = page.getByRole('button', { name: 'Clear completed' });
    this.toggleAllCheckbox = page.locator('.toggle-all');
  }

  async goto() {
    await this.page.goto('/todomvc');
    await this.waitForPageLoad();
  }

  // ── Actions ──────────────────────────────────────────────────────────────

  async addTodo(text: string) {
    await this.newTodoInput.fill(text);
    await this.newTodoInput.press('Enter');
  }

  async addTodos(items: TodoItem[]) {
    for (const item of items) {
      await this.addTodo(item.text);
      if (item.completed) await this.completeTodo(item.text);
    }
  }

  async completeTodo(text: string) {
    await this.getTodoItem(text).getByRole('checkbox').check();
  }

  async deleteTodo(text: string) {
    const item = this.getTodoItem(text);
    await item.hover();
    await item.locator('.destroy').click({ force: true });
  }

  async editTodo(oldText: string, newText: string) {
    await this.getTodoItem(oldText).dblclick();
    const editInput = this.getTodoItem(oldText).getByRole('textbox');
    await editInput.clear();
    await editInput.fill(newText);
    await editInput.press('Enter');
  }

  async filterBy(filter: FilterType) {
    await this.page.getByRole('link', { name: filter }).click();
  }

  async clearCompleted() {
    await this.clearCompletedBtn.click();
  }

  async toggleAll() {
    await this.toggleAllCheckbox.click();
  }

  // ── Getters ───────────────────────────────────────────────────────────────

  getTodoItem(text: string): Locator {
    return this.todoItems.filter({ hasText: text });
  }

  async getItemCountText(): Promise<string> {
    return (await this.itemCount.textContent()) ?? '';
  }

  async getTodoCount(): Promise<number> {
    return this.todoItems.count();
  }

  // ── Assertions ───────────────────────────────────────────────────────────

  async assertTodoCount(count: number) {
    await expect(this.todoItems).toHaveCount(count);
  }

  async assertTodoVisible(text: string) {
    await expect(this.getTodoItem(text)).toBeVisible();
  }

  async assertTodoCompleted(text: string) {
    await expect(this.getTodoItem(text)).toHaveClass(/completed/);
  }

  async assertTodoNotCompleted(text: string) {
    await expect(this.getTodoItem(text)).not.toHaveClass(/completed/);
  }

  async assertItemCountText(expected: string) {
    await expect(this.itemCount).toContainText(expected);
  }

  async assertClearCompletedVisible(visible: boolean) {
    if (visible) {
      await expect(this.clearCompletedBtn).toBeVisible();
    } else {
      await expect(this.clearCompletedBtn).toBeHidden();
    }
  }
}
