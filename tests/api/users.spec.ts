import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API - Users', () => {
  test('GET /users - should return a list of users', async ({ request }) => {
    const response = await request.get('/users');

    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
  });

  test('GET /users/:id - should return correct user shape', async ({ request }) => {
    const response = await request.get('/users/1');

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toMatchObject({
      id: 1,
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      address: expect.objectContaining({
        city: expect.any(String),
      }),
    });
  });

  test('GET /users/:id/posts - should return posts for a user', async ({ request }) => {
    const response = await request.get('/users/1/posts');

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    posts.forEach((post: { userId: number }) => {
      expect(post.userId).toBe(1);
    });
  });
});
