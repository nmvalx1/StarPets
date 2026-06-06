import { test as base } from '@playwright/test';
import { PostsController } from '../api/controllers/posts.controller';

export { expect } from '@playwright/test';

type ApiFixtures = {
  postsController: PostsController;
};

export const test = base.extend<ApiFixtures>({
  postsController: ({ request }, use) => {
    use(new PostsController(request));
  },
});
