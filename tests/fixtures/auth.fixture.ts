import { test as base } from '@playwright/test';

/** 認證狀態 Fixture - 透過 Session Storage 重用登入狀態 */
type AuthFixture = {
  /** 已登入的 page（使用 Session Storage 注入） */
  loggedInPage: ReturnType<typeof base.extend>;
};

/**
 * 認證 Fixture
 * 透過注入 Session Storage 實現登入狀態重用，避免重複登入操作
 */
export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // 先訪問頁面以設定 Session Storage（需同源）
    await page.goto('/login.html');

    // 直接注入認證狀態到 Session Storage
    await page.evaluate(() => {
      sessionStorage.setItem('user', JSON.stringify({ name: '管理員', role: 'admin' }));
      sessionStorage.setItem('token', 'mock-jwt-token-fixture');
    });

    await use(page);
  },
});
