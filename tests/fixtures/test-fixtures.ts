import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { FormPage } from '../pages/form.page';

/** 自定義 Fixture 類型 */
type CustomFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  formPage: FormPage;
  authenticatedPage: DashboardPage;
};

/**
 * 擴展 Playwright test，加入自定義 Fixture
 * 使用方式：import { test } from './test-fixtures';
 */
export const test = base.extend<CustomFixtures>({
  // Page Object Fixtures
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },

  // 已認證頁面 Fixture（自動登入並導向 Dashboard）
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'admin123');
    await page.waitForURL(/dashboard\.html/);

    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect };
