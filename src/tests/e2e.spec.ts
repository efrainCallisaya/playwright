import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import fs from 'fs';

// Crear carpeta de evidencias si no existe
if (!fs.existsSync('evidencias')) {
  fs.mkdirSync('evidencias');
}

test.describe('End-to-End: Login e Inventario', () => {

  test('Login exitoso redirige a inventario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectOnPage();
  });

  test('Login inválido muestra mensaje de error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Username and password do not match');
  });

  test('Se muestran 6 productos luego del login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectProductCount(6);
  });

  test('Botón Add to Cart visible y habilitado', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectAddToCartVisible();
  });

  test('Captura de pantalla en página de inventario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.takeScreenshot('evidencias/inventory.png');
  });

  test('Verifica título y URL de login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});