import { expect, test } from "../../../setup/fixtures";
import { STATUS_CODES } from "../../data/enums/status-codes.enum";
import generateCreateData from "../../data/generate-data-create.data";
import { createPostResponseSchema } from "../../data/schemes/post.schema";

test.describe("POST /posts", () => {
  test.describe("Positive", () => {
    test("Should create post with valid data", async ({ postsController }) => {
      const payload = generateCreateData();

      const response = await postsController.create(payload);

      expect.soft(response.status).toBe(STATUS_CODES.CREATE);

      const parsed = createPostResponseSchema.safeParse(response.body);

      expect(parsed.success).toBe(true);

      if (!parsed.success) {
        return;
      }

      expect(parsed.data.title).toBe(payload.title);
      expect(parsed.data.body).toBe(payload.body);
      expect(parsed.data.userId).toBe(payload.userId);
    });
  });
});
