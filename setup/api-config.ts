export const apiConfig = {
  BASE_URL: process.env.API_BASE_URL as string,
  ENDPOINTS: {
    POSTS: {
      CREATE: '/posts',
      BY_ID: (id: number) => `/posts/${id}`,
    },
  },
} as const;
