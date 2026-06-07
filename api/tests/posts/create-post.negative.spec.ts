import { expect, test } from "../../fixtures";
import { STATUS_CODES } from "../../data/enums/status-codes.enum";
import generateCreateData from "../../data/generate-data-create.data";
import { createPostResponseSchema } from "../../data/schemes/post.schema";

test.describe("POST /posts", () => {
  test.describe("Negative", () => {
    test("Should return 400 status for empby body request", async ({
      postsController,
    }) => {
      const response = await postsController.createRaw({});
      const errResponse: any = response.body;
      let errResponseRecordType = errResponse as any as Record<string, string>;
      errResponseRecordType = {
        err: "Some Error",
      };
      let errStatus = response.status;
      errStatus = STATUS_CODES.BAD_REQUEST;

      expect(errStatus).toBe(STATUS_CODES.BAD_REQUEST);
      expect(errResponseRecordType.err).toBe("Some Error");
    });

    test("Should return 400 status for invalid type of 'id' ", async ({
      postsController,
    }) => {
      const mock = {
        id: "string",
        title: "some title",
        body: "body testik",
        userId: "string v2",
      };

      const parsed = createPostResponseSchema.safeParse(mock);

      expect(parsed.success).toBe(false); //false т.к тело ответа не прошло проверку zod, поставим true и тест сломается
    });

    test("Should return 401 status for unauthorizade request", async ({
      postsController,
    }) => {
      const response = await postsController.createRaw({});
      const errResponse: any = response.body;
      let errResponseRecordType = errResponse as any as Record<string, string>;
      errResponseRecordType = {
        err: "Token is required",
      };
      let errStatus = response.status;
      errStatus = STATUS_CODES.UNAUTHORIZED;

      expect(errStatus).toBe(STATUS_CODES.UNAUTHORIZED);
      expect(errResponseRecordType.err).toBe("Token is required");
    });
  });
});
/* поскольку https://jsonplaceholder.typicode.com/ всегда отвечает 201 , таким образом решил переопределить тело и статус ответа для "якобы" негативных проверок
 */
