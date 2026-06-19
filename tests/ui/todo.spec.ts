import { test, expect } from '../fixtures/todo.fixture';

test.describe('Todo App - UI Tests', () => {
  test('should display empty state on first load', async ({ todoPage }) => {
    await expect(todoPage.getTodoItems()).toHaveCount(0);
  });

  test('should add a new todo item', async ({ todoPage }) => {
    await todoPage.addTodo('Buy groceries');
    await expect(todoPage.getTodoItems()).toHaveCount(1);
    await expect(todoPage.page.getByText('Buy groceries')).toBeVisible();
  });

  test('should add multiple todo items', async ({ todoPage }) => {
    await todoPage.addTodo('First task');
    await todoPage.addTodo('Second task');
    await todoPage.addTodo('Third task');
    await expect(todoPage.getTodoItems()).toHaveCount(3);
  });

  test('should mark a todo as completed', async ({ todoPage }) => {
    await todoPage.addTodo('Complete this task');
    await todoPage.completeTodo('Complete this task');

    const item = todoPage.getTodoItems().first();
    await expect(item).toHaveClass(/completed/);
  });

  test('should filter active todos', async ({ todoPage }) => {
    await todoPage.addTodo('Active task');
    await todoPage.addTodo('Done task');
    await todoPage.completeTodo('Done task');

    await todoPage.page.getByRole('link', { name: 'Active' }).click();
    await expect(todoPage.getTodoItems()).toHaveCount(1);
    await expect(todoPage.page.getByText('Active task')).toBeVisible();
  });

  test('should filter completed todos', async ({ todoPage }) => {
    await todoPage.addTodo('Active task');
    await todoPage.addTodo('Done task');
    await todoPage.completeTodo('Done task');

    await todoPage.page.getByRole('link', { name: 'Completed' }).click();
    await expect(todoPage.getTodoItems()).toHaveCount(1);
    await expect(todoPage.page.getByText('Done task')).toBeVisible();
  });

  test('should clear completed todos', async ({ todoPage }) => {
    await todoPage.addTodo('Keep this');
    await todoPage.addTodo('Remove this');
    await todoPage.completeTodo('Remove this');

    await todoPage.page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(todoPage.getTodoItems()).toHaveCount(1);
    await expect(todoPage.page.getByText('Keep this')).toBeVisible();
  });

  test('should show item count', async ({ todoPage }) => {
    await todoPage.addTodo('Task 1');
    await todoPage.addTodo('Task 2');
    await expect(todoPage.page.getByText('2 items left')).toBeVisible();

    await todoPage.completeTodo('Task 1');
    await expect(todoPage.page.getByText('1 item left')).toBeVisible();
  });
});
