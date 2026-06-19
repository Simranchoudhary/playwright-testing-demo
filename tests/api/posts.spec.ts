import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder API - Posts', () => {
  test('GET /posts - should return a list of posts', async ({ request }) => {
    const response = await request.get('/posts');

    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toMatchObject({
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
      userId: expect.any(Number),
    });
  });

  test('GET /posts/:id - should return a single post', async ({ request }) => {
    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post).toMatchObject({
      id: 1,
      title: expect.any(String),
      body: expect.any(String),
      userId: expect.any(Number),
    });
  });

  test('GET /posts/:id - should return 404 for non-existent post', async ({ request }) => {
    const response = await request.get('/posts/99999');
    expect(response.status()).toBe(404);
  });

  test('POST /posts - should create a new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post body.',
      userId: 1,
    };

    const response = await request.post('/posts', { data: newPost });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject({
      id: expect.any(Number),
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId,
    });
  });

  test('PUT /posts/:id - should update a post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content.',
      userId: 1,
    };

    const response = await request.put('/posts/1', { data: updatedPost });

    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(result.title).toBe('Updated Title');
  });

  test('PATCH /posts/:id - should partially update a post', async ({ request }) => {
    const response = await request.patch('/posts/1', {
      data: { title: 'Patched Title' },
    });

    expect(response.status()).toBe(200);
    const result = await response.json();
    expect(result.title).toBe('Patched Title');
  });

  test('DELETE /posts/:id - should delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });
});
