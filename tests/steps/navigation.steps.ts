import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { When } = createBdd();

When('我點擊導覽列的 {string} 連結', async ({ page }, linkText: string) => {
  await page.locator(`.navbar nav a:has-text("${linkText}")`).click();
  await page.waitForLoadState('domcontentloaded');
});

When('我點擊登出按鈕', async ({ page }) => {
  await page.locator('#logout-btn').click();
});
