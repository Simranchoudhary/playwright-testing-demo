import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseApi {
  protected readonly request: APIRequestContext;
  protected abstract readonly basePath: string;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  protected async get(path: string): Promise<APIResponse> {
    return this.request.get(`${this.basePath}${path}`);
  }

  protected async post(path: string, data: unknown): Promise<APIResponse> {
    return this.request.post(`${this.basePath}${path}`, { data });
  }

  protected async put(path: string, data: unknown): Promise<APIResponse> {
    return this.request.put(`${this.basePath}${path}`, { data });
  }

  protected async patch(path: string, data: unknown): Promise<APIResponse> {
    return this.request.patch(`${this.basePath}${path}`, { data });
  }

  protected async delete(path: string): Promise<APIResponse> {
    return this.request.delete(`${this.basePath}${path}`);
  }
}
