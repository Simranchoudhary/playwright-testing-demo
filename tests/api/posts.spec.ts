import { test, expect } from '../fixtures';
import { POST_PAYLOAD, UPDATED_POST, PATCH_PAYLOAD } from '../../src/utils/testData';
import { Post } from '../../src/types/api.types';

const RESPONSE_TIME_SLA_MS = 2000;

test.describe('Posts API', () => {
  test.describe('GET /posts', () => {
    test('returns a non-empty array of posts', { tag: ['@smoke'] }, async ({ postsApi }) => {
      const response = await postsApi.getAll();

      expect(response.status()).toBe(200);
      const posts: Post[] = await response.json();
      expect(Array.isArray(posts)).toBeTruthy();
      expect(posts.length).toBeGreaterThan(0);
    });

    test('each post has the expected shape', { tag: ['@regression'] }, async ({ postsApi }) => {
      const posts: Post[] = await (await postsApi.getAll()).json();

      posts.forEach((post) => {
        expect(post).toMatchObject({
          id: expect.any(Number),
          userId: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
        });
      });
    });

    test('responds within SLA', { tag: ['@smoke'] }, async ({ postsApi }) => {
      const { response, durationMs } = await postsApi.getAllTimed();

      expect(response.status()).toBe(200);
      expect(durationMs).toBeLessThan(RESPONSE_TIME_SLA_MS);
    });
  });

  test.describe('GET /posts/:id', () => {
    test('returns the correct post by ID', { tag: ['@smoke'] }, async ({ postsApi }) => {
      const response = await postsApi.getById(1);

      expect(response.status()).toBe(200);
      const post: Post = await response.json();
      expect(post.id).toBe(1);
    });

    test('returns 404 for a non-existent post', { tag: ['@regression'] }, async ({ postsApi }) => {
      const response = await postsApi.getById(99999);
      expect(response.status()).toBe(404);
    });
  });

  test.describe('POST /posts', () => {
    test(
      'creates a post and returns 201 with the new resource',
      { tag: ['@smoke'] },
      async ({ postsApi }) => {
        await test.step('Send create request', async () => {
          const response = await postsApi.create(POST_PAYLOAD);
          expect(response.status()).toBe(201);

          const created: Post = await response.json();
          expect(created).toMatchObject({
            id: expect.any(Number),
            title: POST_PAYLOAD.title,
            body: POST_PAYLOAD.body,
            userId: POST_PAYLOAD.userId,
          });
        });
      },
    );
  });

  test.describe('PUT /posts/:id', () => {
    test(
      'replaces a post and returns the updated resource',
      { tag: ['@regression'] },
      async ({ postsApi }) => {
        const payload = { ...POST_PAYLOAD, ...UPDATED_POST };
        const response = await postsApi.update(1, payload);

        expect(response.status()).toBe(200);
        const updated: Post = await response.json();
        expect(updated.title).toBe(UPDATED_POST.title);
        expect(updated.body).toBe(UPDATED_POST.body);
      },
    );
  });

  test.describe('PATCH /posts/:id', () => {
    test('partially updates a post', { tag: ['@regression'] }, async ({ postsApi }) => {
      const response = await postsApi.partialUpdate(1, PATCH_PAYLOAD);

      expect(response.status()).toBe(200);
      const patched: Post = await response.json();
      expect(patched.title).toBe(PATCH_PAYLOAD.title);
    });
  });

  test.describe('DELETE /posts/:id', () => {
    test('deletes a post and returns 200', { tag: ['@regression'] }, async ({ postsApi }) => {
      const response = await postsApi.remove(1);
      expect(response.status()).toBe(200);
    });
  });
});
