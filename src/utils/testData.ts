import { TodoItem } from '../types/todo.types';
import { CreatePostPayload } from '../types/api.types';

export const TODO_ITEMS: TodoItem[] = [
  { text: 'Buy groceries' },
  { text: 'Walk the dog' },
  { text: 'Read a book', completed: true },
  { text: 'Write unit tests' },
];

export const POST_PAYLOAD: CreatePostPayload = {
  userId: 1,
  title: 'Playwright API Testing',
  body: 'This post was created during an automated API test using Playwright.',
};

export const UPDATED_POST: Partial<CreatePostPayload> = {
  title: 'Updated via PUT request',
  body: 'This post body was fully replaced.',
};

export const PATCH_PAYLOAD: Partial<CreatePostPayload> = {
  title: 'Patched Title Only',
};
