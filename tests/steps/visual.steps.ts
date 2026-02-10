import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Then } = createBdd();

Then('登入頁面的截圖應該與基準線一致', async ({ page }) => {
  await expect(page).toHaveScreenshot('login-page.png', {
    maxDiffPixelRatio: 0.05,
    fullPage: true,
  });
});

Then('儀表板頁面的截圖應該與基準線一致', async ({ page }) => {
  // 等待資料載入完成
  await page.waitForFunction(() => document.getElementById('total-users')?.textContent !== '--');
  await expect(page).toHaveScreenshot('dashboard-page.png', {
    maxDiffPixelRatio: 0.05,
    fullPage: true,
  });
});

Then('表單頁面的截圖應該與基準線一致', async ({ page }) => {
  await expect(page).toHaveScreenshot('form-page.png', {
    maxDiffPixelRatio: 0.05,
    fullPage: true,
  });
});
