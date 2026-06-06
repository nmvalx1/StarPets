import { faker } from "@faker-js/faker";

export default function generateCreateData<ICreatePostPayload>(
  params?: Partial<ICreatePostPayload>,
) {
  return {
    title: faker.animal.type(),
    body: faker.person.zodiacSign(),
    userId: faker.number.int({ min: 1, max: 5000 }),
    ...params,
  };
}
