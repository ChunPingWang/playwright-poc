import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

let apiRequests: { url: string; method: string }[] = [];

Given('我設定 Dashboard API 回傳自定義統計資料', async ({ page }) => {
  await page.route('**/api/dashboard', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        stats: { totalUsers: 9999, totalOrders: 888, revenue: 1234567, satisfaction: 99.9 },
        recentOrders: [
          { id: 'MOCK-001', customer: '模擬客戶', amount: 99999, status: 'active', date: '2025-01-01' }
        ]
      })
    });
  });
});

Given('我設定 Dashboard API 回傳 500 錯誤', async ({ page }) => {
  await page.route('**/api/dashboard', (route) => {
    route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Internal Server Error' }) });
  });
});

When('我前往儀表板頁面', async ({ page }) => {
  await page.goto('/dashboard.html');
  await page.waitForLoadState('domcontentloaded');
});

Then('我應該看到自定義的統計數據', async ({ page }) => {
  await page.waitForFunction(() => document.getElementById('total-users')?.textContent !== '--');
  const totalUsers = await page.locator('#total-users').textContent();
  expect(totalUsers).toBe('9,999');
});

Then('儀表板應該顯示載入狀態', async ({ page }) => {
  // API 錯誤時，統計資料保持初始狀態
  const totalUsers = await page.locator('#total-users').textContent();
  expect(totalUsers).toBe('--');
});

When('我監控 API 請求並執行登入', async ({ page }) => {
  apiRequests = [];
  page.on('request', (request) => {
    apiRequests.push({ url: request.url(), method: request.method() });
  });

  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin123');
  await page.locator('#login-btn').click();
  await page.waitForURL(/dashboard\.html/);
});

Then('應該有一個 POST 請求到 {string}', async ({}, path: string) => {
  const found = apiRequests.some(r => r.url.includes(path) && r.method === 'POST');
  expect(found).toBeTruthy();
});
