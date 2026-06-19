import { test as base } from '@playwright/test';
import { TodoPage } from '../../src/pages/TodoPage';
import { PostsApi } from '../../src/api/PostsApi';
import { UsersApi } from '../../src/api/UsersApi';

type Fixtures = {
  todoPage: TodoPage;
  postsApi: PostsApi;
  usersApi: UsersApi;
};

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },

  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },

  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
});

export { expect } from '@playwright/test';
