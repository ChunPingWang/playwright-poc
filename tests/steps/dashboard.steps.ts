import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard.page';

const { Then } = createBdd();

Then('我應該看到總使用者數', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDataLoaded();
  const value = await dashboard.getTotalUsers();
  expect(value).not.toBe('--');
});

Then('我應該看到本月訂單數', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDataLoaded();
  const value = await dashboard.getTotalOrders();
  expect(value).not.toBe('--');
});

Then('我應該看到本月營收', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDataLoaded();
  const value = await dashboard.getRevenue();
  expect(value).toContain('$');
});

Then('我應該看到滿意度', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDataLoaded();
  const value = await dashboard.getSatisfaction();
  expect(value).toContain('%');
});

Then('我應該看到月度趨勢圖區域', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const isVisible = await dashboard.isChartVisible();
  expect(isVisible).toBeTruthy();
});

Then('我應該看到最近訂單表格', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const isVisible = await dashboard.isOrdersTableVisible();
  expect(isVisible).toBeTruthy();
});

Then('訂單列表應該至少有 {int} 筆資料', async ({ page }, count: number) => {
  const dashboard = new DashboardPage(page);
  await dashboard.waitForDataLoaded();
  const rowCount = await dashboard.getOrderRowCount();
  expect(rowCount).toBeGreaterThanOrEqual(count);
});
