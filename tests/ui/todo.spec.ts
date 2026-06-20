import { test } from '../fixtures';
import { TODO_ITEMS } from '../../src/utils/testData';

test.describe('Todo App', () => {
  test.describe('Adding todos', () => {
    test('shows empty state on first load', { tag: ['@smoke'] }, async ({ todoPage }) => {
      await todoPage.assertTodoCount(0);
    });

    test('adds a single todo item', { tag: ['@smoke'] }, async ({ todoPage }) => {
      await test.step('Add todo item', async () => {
        await todoPage.addTodo('Buy groceries');
      });
      await test.step('Assert item is visible', async () => {
        await todoPage.assertTodoCount(1);
        await todoPage.assertTodoVisible('Buy groceries');
      });
    });

    test('adds multiple todo items', { tag: ['@regression'] }, async ({ todoPage }) => {
      await test.step('Add all test items', async () => {
        await todoPage.addTodos(TODO_ITEMS);
      });
      await test.step('Assert count matches', async () => {
        await todoPage.assertTodoCount(TODO_ITEMS.length);
      });
    });
  });

  test.describe('Completing todos', () => {
    test('marks a todo as completed', { tag: ['@smoke'] }, async ({ todoPage }) => {
      await test.step('Add and complete todo', async () => {
        await todoPage.addTodo('Finish report');
        await todoPage.completeTodo('Finish report');
      });
      await test.step('Assert completed state', async () => {
        await todoPage.assertTodoCompleted('Finish report');
      });
    });

    test(
      'updates the item counter when completing a todo',
      { tag: ['@regression'] },
      async ({ todoPage }) => {
        await todoPage.addTodo('Task A');
        await todoPage.addTodo('Task B');
        await todoPage.assertItemCountText('2 items left');

        await todoPage.completeTodo('Task A');
        await todoPage.assertItemCountText('1 item left');
      },
    );

    test('toggles all todos at once', { tag: ['@regression'] }, async ({ todoPage }) => {
      await test.step('Add two todos and toggle all', async () => {
        await todoPage.addTodo('Task 1');
        await todoPage.addTodo('Task 2');
        await todoPage.toggleAll();
      });
      await test.step('Assert both completed', async () => {
        await todoPage.assertTodoCompleted('Task 1');
        await todoPage.assertTodoCompleted('Task 2');
      });
    });
  });

  test.describe('Editing todos', () => {
    test('edits a todo by double-clicking', { tag: ['@regression'] }, async ({ todoPage }) => {
      await test.step('Add original todo', async () => {
        await todoPage.addTodo('Original text');
      });
      await test.step('Edit todo inline', async () => {
        await todoPage.editTodo('Original text', 'Updated text');
      });
      await test.step('Assert updated text is visible', async () => {
        await todoPage.assertTodoVisible('Updated text');
      });
    });
  });

  test.describe('Deleting todos', () => {
    test('removes a todo item', { tag: ['@regression'] }, async ({ todoPage }) => {
      await test.step('Add two todos', async () => {
        await todoPage.addTodo('Delete me');
        await todoPage.addTodo('Keep me');
      });
      await test.step('Delete one todo', async () => {
        await todoPage.deleteTodo('Delete me');
      });
      await test.step('Assert only the correct item remains', async () => {
        await todoPage.assertTodoCount(1);
        await todoPage.assertTodoVisible('Keep me');
      });
    });
  });

  test.describe('Filtering todos', () => {
    test.beforeEach(async ({ todoPage }) => {
      await todoPage.addTodo('Active task');
      await todoPage.addTodo('Completed task');
      await todoPage.completeTodo('Completed task');
    });

    test('shows only active todos', { tag: ['@smoke'] }, async ({ todoPage }) => {
      await todoPage.filterBy('Active');
      await todoPage.assertTodoCount(1);
      await todoPage.assertTodoVisible('Active task');
    });

    test('shows only completed todos', { tag: ['@regression'] }, async ({ todoPage }) => {
      await todoPage.filterBy('Completed');
      await todoPage.assertTodoCount(1);
      await todoPage.assertTodoVisible('Completed task');
    });

    test('shows all todos', { tag: ['@regression'] }, async ({ todoPage }) => {
      await todoPage.filterBy('Completed');
      await todoPage.filterBy('All');
      await todoPage.assertTodoCount(2);
    });
  });

  test.describe('Clear completed', () => {
    test('removes all completed todos', { tag: ['@smoke'] }, async ({ todoPage }) => {
      await test.step('Setup: add one active and one completed todo', async () => {
        await todoPage.addTodo('Keep this');
        await todoPage.addTodo('Remove this');
        await todoPage.completeTodo('Remove this');
      });
      await test.step('Clear completed', async () => {
        await todoPage.clearCompleted();
      });
      await test.step('Assert only active todo remains', async () => {
        await todoPage.assertTodoCount(1);
        await todoPage.assertTodoVisible('Keep this');
      });
    });

    test(
      'hides the button when no todos are completed',
      { tag: ['@regression'] },
      async ({ todoPage }) => {
        await todoPage.addTodo('Not done yet');
        await todoPage.assertClearCompletedVisible(false);
      },
    );

    test(
      'shows the button when at least one todo is completed',
      { tag: ['@regression'] },
      async ({ todoPage }) => {
        await todoPage.addTodo('Done');
        await todoPage.completeTodo('Done');
        await todoPage.assertClearCompletedVisible(true);
      },
    );
  });
});
