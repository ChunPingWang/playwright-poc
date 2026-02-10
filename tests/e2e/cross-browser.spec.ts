import { test, expect } from '@playwright/test';

test.describe('跨瀏覽器相容性測試', () => {
  test('登入頁面在各瀏覽器中正常顯示', async ({ page, browserName }) => {
    await page.goto('/login.html');

    // 驗證基本元素存在
    await expect(page.locator('.login-box')).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-btn')).toBeVisible();

    // 驗證頁面標題
    await expect(page).toHaveTitle(/登入/);

    console.log(`瀏覽器 ${browserName}: 登入頁面正常顯示`);
  });

  test('登入流程在各瀏覽器中正常運作', async ({ page, browserName }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');

    await expect(page).toHaveURL(/dashboard\.html/);
    await expect(page.locator('#user-display')).toContainText('管理員');

    console.log(`瀏覽器 ${browserName}: 登入流程正常`);
  });

  test('表單功能在各瀏覽器中正常運作', async ({ page, browserName }) => {
    // 先登入
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);

    // 導覽到表單頁
    await page.goto('/form.html');

    // 驗證表單元素
    await expect(page.locator('#first-name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#department')).toBeVisible();

    // 填寫並驗證
    await page.fill('#first-name', '測試');
    await expect(page.locator('#first-name')).toHaveValue('測試');

    console.log(`瀏覽器 ${browserName}: 表單功能正常`);
  });
});
