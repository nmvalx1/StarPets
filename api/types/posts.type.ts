export interface ICreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

export interface ICreatePostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

