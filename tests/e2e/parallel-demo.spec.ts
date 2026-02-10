import { test, expect } from '@playwright/test';

test.describe('平行執行展示', () => {
  test.describe.configure({ mode: 'parallel' });

  test('平行任務 1: 登入驗證', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);
    console.log(`Worker: 登入驗證完成`);
  });

  test('平行任務 2: 表單驗證', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);

    await page.goto('/form.html');
    await page.click('#submit-btn');
    await expect(page.locator('#first-name-error.visible')).toBeVisible();
    console.log(`Worker: 表單驗證完成`);
  });

  test('平行任務 3: API 健康檢查', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    console.log(`Worker: API 健康檢查完成`);
  });

  test('平行任務 4: Dashboard 資料載入', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);

    await page.waitForFunction(() =>
      document.getElementById('total-users')?.textContent !== '--'
    );
    const users = await page.locator('#total-users').textContent();
    expect(users).not.toBe('--');
    console.log(`Worker: Dashboard 資料載入完成`);
  });

  test('平行任務 5: 錯誤登入測試', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'wrong');
    await page.fill('#password', 'wrong');
    await page.click('#login-btn');
    await expect(page.locator('#login-error')).toBeVisible();
    console.log(`Worker: 錯誤登入測試完成`);
  });
});
