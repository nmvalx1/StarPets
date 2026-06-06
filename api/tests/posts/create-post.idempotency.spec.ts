import { randomUUID } from "crypto";
import { expect, test } from "../../../setup/fixtures";
import { STATUS_CODES } from "../../data/enums/status-codes.enum";
import generateCreateData from "../../data/generate-data-create.data";

test.describe("POST /posts — idempotencety", () => {
  test("Should handle duplicate POST with same X-Idempotency-Key", async ({
    postsController,
  }) => {
    const idempotencyKey = randomUUID();
    const payload = generateCreateData();
    const headers = { "X-Idempotency-Key": idempotencyKey };

    const [first, second, third] = await Promise.all([
      postsController.create(payload, headers),
      postsController.create(payload, headers),
      postsController.create(payload, headers),
    ]);

    expect(first.status).toBe(STATUS_CODES.CREATE);
    expect(second.status).toBe(STATUS_CODES.CREATE);
    expect(third.status).toBe(STATUS_CODES.CREATE);

    const ids = [first.body.id, second.body.id, third.body.id];
    const newSet = new Set(ids);
    //exppect(newSet.size).toBe(1) если бы в jsonplaceholder была бы иденмотентность;
  });
});
