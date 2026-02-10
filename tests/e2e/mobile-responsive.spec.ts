import { test, expect } from '@playwright/test';

// iPhone 模擬 (viewport + userAgent)
test.describe('行動裝置 - iPhone 13', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    isMobile: true,
    hasTouch: true,
  });

  test('登入頁在 iPhone 上正常顯示', async ({ page }) => {
    await page.goto('/login.html');
    await expect(page.locator('.login-box')).toBeVisible();
    await expect(page.locator('#login-btn')).toBeVisible();

    await page.screenshot({ path: 'screenshots/login-iphone13.png', fullPage: true });
  });

  test('儀表板在 iPhone 上自適應排列', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);

    await page.waitForFunction(() =>
      document.getElementById('total-users')?.textContent !== '--'
    );
    await expect(page.locator('[data-testid="stat-users"]')).toBeVisible();

    await page.screenshot({ path: 'screenshots/dashboard-iphone13.png', fullPage: true });
  });
});

// Android 模擬
test.describe('行動裝置 - Pixel 5', () => {
  test.use({
    viewport: { width: 393, height: 851 },
    userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 5) AppleWebKit/537.36',
    isMobile: true,
    hasTouch: true,
  });

  test('登入頁在 Pixel 5 上正常顯示', async ({ page }) => {
    await page.goto('/login.html');
    await expect(page.locator('.login-box')).toBeVisible();

    await page.screenshot({ path: 'screenshots/login-pixel5.png', fullPage: true });
  });

  test('表單在 Pixel 5 上可正常操作', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);

    await page.goto('/form.html');
    await expect(page.locator('#contact-form')).toBeVisible();
    await page.fill('#first-name', '行動');
    await expect(page.locator('#first-name')).toHaveValue('行動');

    await page.screenshot({ path: 'screenshots/form-pixel5.png', fullPage: true });
  });
});

// Tablet 模擬
test.describe('行動裝置 - iPad Mini', () => {
  test.use({
    viewport: { width: 768, height: 1024 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
    isMobile: true,
    hasTouch: true,
  });

  test('儀表板在平板上正常顯示', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('#login-btn');
    await expect(page).toHaveURL(/dashboard\.html/);

    await page.waitForFunction(() =>
      document.getElementById('total-users')?.textContent !== '--'
    );

    await page.screenshot({ path: 'screenshots/dashboard-ipad.png', fullPage: true });
  });
});
