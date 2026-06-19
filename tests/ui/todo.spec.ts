import { test, expect } from '../fixtures';
import { TODO_ITEMS } from '../../src/utils/testData';

test.describe('Todo App', () => {
  test.describe('Adding todos', () => {
    test('shows empty state on first load', async ({ todoPage }) => {
      await todoPage.assertTodoCount(0);
    });

    test('adds a single todo item', async ({ todoPage }) => {
      await todoPage.addTodo('Buy groceries');
      await todoPage.assertTodoCount(1);
      await todoPage.assertTodoVisible('Buy groceries');
    });

    test('adds multiple todo items', async ({ todoPage }) => {
      await todoPage.addTodos(TODO_ITEMS);
      await todoPage.assertTodoCount(TODO_ITEMS.length);
    });
  });

  test.describe('Completing todos', () => {
    test('marks a todo as completed', async ({ todoPage }) => {
      await todoPage.addTodo('Finish report');
      await todoPage.completeTodo('Finish report');
      await todoPage.assertTodoCompleted('Finish report');
    });

    test('updates the item counter when completing a todo', async ({ todoPage }) => {
      await todoPage.addTodo('Task A');
      await todoPage.addTodo('Task B');
      await todoPage.assertItemCountText('2 items left');

      await todoPage.completeTodo('Task A');
      await todoPage.assertItemCountText('1 item left');
    });

    test('toggles all todos at once', async ({ todoPage }) => {
      await todoPage.addTodo('Task 1');
      await todoPage.addTodo('Task 2');
      await todoPage.toggleAll();

      await todoPage.assertTodoCompleted('Task 1');
      await todoPage.assertTodoCompleted('Task 2');
    });
  });

  test.describe('Editing todos', () => {
    test('edits a todo by double-clicking', async ({ todoPage }) => {
      await todoPage.addTodo('Original text');
      await todoPage.editTodo('Original text', 'Updated text');
      await todoPage.assertTodoVisible('Updated text');
    });
  });

  test.describe('Deleting todos', () => {
    test('removes a todo item', async ({ todoPage }) => {
      await todoPage.addTodo('Delete me');
      await todoPage.addTodo('Keep me');
      await todoPage.deleteTodo('Delete me');

      await todoPage.assertTodoCount(1);
      await todoPage.assertTodoVisible('Keep me');
    });
  });

  test.describe('Filtering todos', () => {
    test.beforeEach(async ({ todoPage }) => {
      await todoPage.addTodo('Active task');
      await todoPage.addTodo('Completed task');
      await todoPage.completeTodo('Completed task');
    });

    test('shows only active todos', async ({ todoPage }) => {
      await todoPage.filterBy('Active');
      await todoPage.assertTodoCount(1);
      await todoPage.assertTodoVisible('Active task');
    });

    test('shows only completed todos', async ({ todoPage }) => {
      await todoPage.filterBy('Completed');
      await todoPage.assertTodoCount(1);
      await todoPage.assertTodoVisible('Completed task');
    });

    test('shows all todos', async ({ todoPage }) => {
      await todoPage.filterBy('Completed');
      await todoPage.filterBy('All');
      await todoPage.assertTodoCount(2);
    });
  });

  test.describe('Clear completed', () => {
    test('removes all completed todos', async ({ todoPage }) => {
      await todoPage.addTodo('Keep this');
      await todoPage.addTodo('Remove this');
      await todoPage.completeTodo('Remove this');

      await todoPage.clearCompleted();
      await todoPage.assertTodoCount(1);
      await todoPage.assertTodoVisible('Keep this');
    });

    test('hides the button when no todos are completed', async ({ todoPage }) => {
      await todoPage.addTodo('Not done yet');
      await todoPage.assertClearCompletedVisible(false);
    });

    test('shows the button when at least one todo is completed', async ({ todoPage }) => {
      await todoPage.addTodo('Done');
      await todoPage.completeTodo('Done');
      await todoPage.assertClearCompletedVisible(true);
    });
  });
});
