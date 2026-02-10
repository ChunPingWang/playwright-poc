import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

let startTime: number;

Given('我開始計時', async ({}) => {
  startTime = Date.now();
});

When('我前往登入頁面', async ({ page }) => {
  await page.goto('/login.html');
  await page.waitForLoadState('domcontentloaded');
});

Then('頁面載入時間應該小於 {int} 秒', async ({}, seconds: number) => {
  const elapsed = Date.now() - startTime;
  console.log(`頁面載入時間: ${elapsed}ms`);
  expect(elapsed).toBeLessThan(seconds * 1000);
});

Then('我應該能蒐集到頁面效能指標', async ({ page }) => {
  // 等待資料載入
  await page.waitForFunction(() => document.getElementById('total-users')?.textContent !== '--');

  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
      loadComplete: navigation.loadEventEnd - navigation.startTime,
      domInteractive: navigation.domInteractive - navigation.startTime,
      responseTime: navigation.responseEnd - navigation.requestStart,
    };
  });

  console.log('效能指標:', JSON.stringify(metrics, null, 2));
  expect(metrics.domContentLoaded).toBeGreaterThan(0);
  expect(metrics.domInteractive).toBeGreaterThan(0);
});
