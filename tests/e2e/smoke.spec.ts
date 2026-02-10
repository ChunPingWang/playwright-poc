import { test, expect } from '@playwright/test';

test.describe('冒煙測試 @smoke', () => {
  test('首頁應導向登入頁', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/login\.html/);
  });

  test('登入頁面可正常載入', async ({ page }) => {
    await page.goto('/login.html');
    await expect(page.locator('#login-form')).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-btn')).toBeVisible();
  });

  test('使用正確帳密可成功登入', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);
  });

  test('儀表板頁面載入並顯示資料', async ({ page }) => {
    // 先登入
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);

    // 驗證統計資料載入
    await page.waitForFunction(() =>
      document.getElementById('total-users')?.textContent !== '--'
    );
    await expect(page.locator('[data-testid="stat-users"]')).toBeVisible();
    await expect(page.locator('[data-testid="recent-orders"]')).toBeVisible();
  });

  test('Health Check API 正常回應', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.status).toBe('ok');
  });
});
