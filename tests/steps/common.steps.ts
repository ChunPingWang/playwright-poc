import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const { Given, When, Then } = createBdd();

// --- 共用步驟：登入相關 ---

Given('我在登入頁面', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

Given('我已登入系統', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin', 'admin123');
  await page.waitForURL(/dashboard\.html/);
});

Given('我已登出系統', async ({ page }) => {
  await page.evaluate(() => sessionStorage.clear());
});

// --- 共用步驟：頁面導覽 ---

Given('我在儀表板頁面', async ({ page }) => {
  await page.goto('/dashboard.html');
  await page.waitForLoadState('domcontentloaded');
});

Given('我在表單頁面', async ({ page }) => {
  await page.goto('/form.html');
  await page.waitForLoadState('domcontentloaded');
});

When('我嘗試直接存取儀表板頁面', async ({ page }) => {
  await page.goto('/dashboard.html');
  await page.waitForLoadState('domcontentloaded');
});

// --- 共用步驟：驗證導向 ---

Then('我應該被導向到儀表板頁面', async ({ page }) => {
  await expect(page).toHaveURL(/dashboard\.html/);
});

Then('我應該被導向到登入頁面', async ({ page }) => {
  await expect(page).toHaveURL(/login\.html/);
});

Then('我應該被導向到表單頁面', async ({ page }) => {
  await expect(page).toHaveURL(/form\.html/);
});

Then('我應該看到歡迎訊息包含 {string}', async ({ page }, name: string) => {
  const userDisplay = page.locator('#user-display');
  await expect(userDisplay).toContainText(name);
});
