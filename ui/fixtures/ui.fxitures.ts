import { test as base } from "@playwright/test";
import { ProductCardPage } from "../pages/product-card.page";

type FixtueUi = {
  productCardPage: Readonly<ProductCardPage>;
};

const test = base.extend<FixtueUi>({
  productCardPage: async ({ page }, use) => {
    await use(new ProductCardPage(page));
  },
});

export { test }
export { expect } from '@playwright/test';