import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const { Then } = createBdd();

Then('登入頁面應該通過無障礙檢查', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

Then('儀表板頁面應該通過無障礙檢查', async ({ page }) => {
  // 等待資料載入
  await page.waitForFunction(() => document.getElementById('total-users')?.textContent !== '--');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .disableRules(['color-contrast'])
    .analyze();

  expect(results.violations).toEqual([]);
});

Then('表單頁面應該通過無障礙檢查', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .disableRules(['color-contrast'])
    .analyze();

  expect(results.violations).toEqual([]);
});
