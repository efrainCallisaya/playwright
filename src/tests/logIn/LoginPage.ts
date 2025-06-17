import { Page } from "playwright/test";

class LoginPage {
  constructor(private page: Page) {}
  async login(email: string, password: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('button[type="submit"]');
  }
}
