import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  retries: 1,
  reporter: [['html', { open: 'always' }]],
  use: {
    headless: true,
    screenshot: 'on', // Captura screenshot en todos los tests
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    baseURL: 'https://www.saucedemo.com',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
