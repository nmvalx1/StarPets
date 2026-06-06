import { z } from 'zod';

export const createPostResponseSchema = z
  .object({
    id: z.number().int().positive(),
    title: z.string(),
    body: z.string(),
    userId: z.number().int().positive(),
  })
  .strict();

export type CreatePostResponse = z.infer<typeof createPostResponseSchema>;
