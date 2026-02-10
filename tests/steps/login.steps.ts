import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const { Given, When, Then } = createBdd();

When('我輸入帳號 {string} 和密碼 {string}', async ({ page }, username: string, password: string) => {
  const loginPage = new LoginPage(page);
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
});

When('我點擊登入按鈕', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.clickLogin();
});

Then('我應該看到登入錯誤訊息 {string}', async ({ page }, message: string) => {
  const loginError = page.locator('#login-error');
  await expect(loginError).toBeVisible();
  await expect(loginError).toContainText(message);
});

Then('我應該看到帳號欄位錯誤提示', async ({ page }) => {
  await expect(page.locator('#username-error')).toBeVisible();
});

Then('我應該看到密碼欄位錯誤提示', async ({ page }) => {
  await expect(page.locator('#password-error')).toBeVisible();
});

Then('登入結果應該是 {string}', async ({ page }, result: string) => {
  if (result === '成功') {
    await expect(page).toHaveURL(/dashboard\.html/, { timeout: 5000 });
  } else {
    await expect(page.locator('#login-error')).toBeVisible({ timeout: 5000 });
  }
});
