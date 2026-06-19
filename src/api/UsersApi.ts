import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';

export class UsersApi extends BaseApi {
  protected readonly basePath = '/users';

  constructor(request: APIRequestContext) {
    super(request);
  }

  getAll(): Promise<APIResponse> {
    return this.get('');
  }

  getById(id: number): Promise<APIResponse> {
    return this.get(`/${id}`);
  }

  getPosts(userId: number): Promise<APIResponse> {
    return this.get(`/${userId}/posts`);
  }

  getTodos(userId: number): Promise<APIResponse> {
    return this.get(`/${userId}/todos`);
  }
}
