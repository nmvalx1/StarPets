import { APIRequestContext } from '@playwright/test';
import { RequestApi } from '../request-api';
import {
  ICreatePostPayload,
  ICreatePostResponse,
  IRequestOption,
} from '../types';
import { apiConfig } from '../../setup/api-config';

export class PostsController {
  private request: RequestApi;

  constructor(context: APIRequestContext) {
    this.request = new RequestApi(context);
  }

  create(data: ICreatePostPayload, headers: Record<string, string> = {}) {
    const options: IRequestOption = {
      url: apiConfig.ENDPOINTS.POSTS.CREATE,
      method: 'post',
      data,
      headers,
    };

    return this.request.send<ICreatePostResponse>(options);
  }

  createRaw(data: unknown, headers: Record<string, string> = {}) {
    const options: IRequestOption = {
      url: apiConfig.ENDPOINTS.POSTS.CREATE,
      method: 'post',
      data: data as object,
      headers,
    };

    return this.request.send<Record<string, unknown>>(options);
  }

  getById(id: number, headers: Record<string, string> = {}) {
    const options: IRequestOption = {
      url: apiConfig.ENDPOINTS.POSTS.BY_ID(id),
      method: 'get',
      headers,
    };

    return this.request.send<ICreatePostResponse>(options);
  }
}
