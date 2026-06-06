export interface IRequestOption {
  url: string;
  method: 'post' | 'get' | 'patch' | 'put' | 'delete';
  data?: object | string | null;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

export interface IResponseApi<T = object | null | string> {
  status: number;
  headers: Record<string, string>;
  body: T;
}
