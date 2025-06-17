// src/pages/InventoryPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly products: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('.inventory_item');
    this.title = page.locator('.title');
  }

  async expectOnPage() {
    await expect(this.page).toHaveURL(/.*inventory/);
    await expect(this.title).toHaveText('Products');
  }

  async expectProductCount(count: number) {
    await expect(this.products).toHaveCount(count);
  }

  async expectAddToCartVisible() {
    const addButton = this.page.locator('button.btn_inventory').first();
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();
  }

  async takeScreenshot(filePath: string) {
    await this.page.screenshot({ path: filePath, fullPage: true });
  }
}
