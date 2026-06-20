import { test, expect } from '../fixtures';
import { User, Post } from '../../src/types/api.types';

test.describe('Users API', () => {
  test.describe('GET /users', () => {
    test('returns a non-empty array of users', { tag: ['@smoke'] }, async ({ usersApi }) => {
      const response = await usersApi.getAll();

      expect(response.status()).toBe(200);
      const users: User[] = await response.json();
      expect(Array.isArray(users)).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  test.describe('GET /users/:id', () => {
    test('returns correct user shape', { tag: ['@smoke'] }, async ({ usersApi }) => {
      const response = await usersApi.getById(1);

      expect(response.status()).toBe(200);
      const user: User = await response.json();
      expect(user).toMatchObject({
        id: 1,
        name: expect.any(String),
        username: expect.any(String),
        email: expect.stringContaining('@'),
        address: expect.objectContaining({ city: expect.any(String) }),
      });
    });

    test('returns 404 for a non-existent user', { tag: ['@regression'] }, async ({ usersApi }) => {
      const response = await usersApi.getById(99999);
      expect(response.status()).toBe(404);
    });
  });

  test.describe('GET /users/:id/posts', () => {
    test(
      'returns only posts belonging to the user',
      { tag: ['@regression'] },
      async ({ usersApi }) => {
        const response = await usersApi.getPosts(1);

        expect(response.status()).toBe(200);
        const posts: Post[] = await response.json();
        expect(posts.length).toBeGreaterThan(0);
        posts.forEach((post) => expect(post.userId).toBe(1));
      },
    );
  });

  test.describe('GET /users/:id/todos', () => {
    test('returns todos for the user', { tag: ['@regression'] }, async ({ usersApi }) => {
      const response = await usersApi.getTodos(1);

      expect(response.status()).toBe(200);
      const todos = await response.json();
      expect(Array.isArray(todos)).toBeTruthy();
    });
  });
});
