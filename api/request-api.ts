import { APIRequestContext, APIResponse } from "@playwright/test";
import { IResponseApi, IRequestOption } from "./types";

export class RequestApi {
  constructor(private requestContext: APIRequestContext) {}

  async send<T extends object | null | string>(
    options: IRequestOption,
  ): Promise<IResponseApi<T>> {
    const { url, method, data, headers, params, timeout } = options;

    const response = await this.requestContext.fetch(url, {
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(params ? { params } : {}),
      timeout,
    });

    return this.transformResponse<T>(response);
  }

  private async transformResponse<T extends object | null | string>(
    response: APIResponse,
  ): Promise<IResponseApi<T>> {
    const headers = response.headers();
    const contentType = headers["content-type"] || "";

    let body: T;
    if (contentType.includes("application/json")) {
      body = (await response.json()) as T;
    } else {
      body = (await response.text()) as T;
    }

    return {
      status: response.status(),
      body,
      headers,
    };
  }
}
