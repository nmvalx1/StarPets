import { Page, Locator, expect } from "@playwright/test";

export class ProductCardPage {
  readonly mainList: Locator;
  readonly title: Locator;
  readonly price: Locator;
  readonly buyButton: Locator;
  readonly closeCardButton: Locator;

  constructor(private readonly page: Page) {
    this.mainList = page.getByTestId("main-datatest-id");
    this.title = this.mainList.getByTestId("title-datatest-id");
    this.price = this.mainList.getByTestId("price-datatest-id");
    this.buyButton = this.mainList.getByTestId("buy-button-datatest-id");
    this.closeCardButton = this.mainList.getByTestId(
      "close-button-datatest-id",
    );
  }
  async getTitleFromCard(): Promise<string> {
    return this.title.innerText();
  }

  async waitForOpened(milliseconds: number = 1000): Promise<void> {
    const timeout: number = milliseconds * 10;
    expect.soft(this.title).toBeVisible({ timeout });
  }

  async openCard(milliseconds: number = 1000): Promise<void> {
    const timeout: number = milliseconds * 10;
    await this.page.goto(`/product-card-page`);
    await this.waitForOpened(timeout);
  }

  async waitForBuyButton(milliseconds: number = 1000): Promise<void> {
    const timeout: number = milliseconds * 10;
    expect.soft(this.buyButton).toBeVisible({ timeout });
    expect.soft(this.buyButton).toBeEnabled({ timeout });
  }

  async clikcBuyButton(): Promise<void> {
    await this.waitForBuyButton();
    await this.buyButton.click();
  }

  async closeCard(): Promise<void> {
    await this.closeCardButton.click();
    expect.soft(this.title).toBeHidden();
  }
}
