import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';

test.describe('Login Flow', () => {

  test.beforeAll(() => {
    if (!fs.existsSync('evidencias')) {
      fs.mkdirSync('evidencias');
    }
  });

  test('Login exitoso con usuario válido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await page.screenshot({ path: 'evidencias/login-exitoso.png', fullPage: true });
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('Login falla con credenciales incorrectas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    const errorText = await loginPage.getErrorMessageText();
    await page.screenshot({ path: 'evidencias/login-fallido.png', fullPage: true });

    expect(errorText).toContain('Username and password do not match');
  });

});
