import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { CreatePostPayload } from '../types/api.types';

export class PostsApi extends BaseApi {
  protected readonly basePath = '/posts';

  constructor(request: APIRequestContext) {
    super(request);
  }

  getAll(): Promise<APIResponse> {
    return this.get('');
  }

  getById(id: number): Promise<APIResponse> {
    return this.get(`/${id}`);
  }

  create(payload: CreatePostPayload): Promise<APIResponse> {
    return this.post('', payload);
  }

  update(id: number, payload: CreatePostPayload): Promise<APIResponse> {
    return this.put(`/${id}`, payload);
  }

  partialUpdate(id: number, payload: Partial<CreatePostPayload>): Promise<APIResponse> {
    return this.patch(`/${id}`, payload);
  }

  remove(id: number): Promise<APIResponse> {
    return this.delete(`/${id}`);
  }
}
