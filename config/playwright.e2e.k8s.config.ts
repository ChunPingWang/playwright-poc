import path from 'path';
import { defineConfig, devices } from '@playwright/test';

const rootDir = path.resolve(__dirname, '..');

/**
 * E2E 測試 Kubernetes 專用設定：
 * - 無 webServer（Demo App 以獨立 K8s Deployment 執行）
 * - BASE_URL 預設為 K8s Service DNS 名稱
 */
export default defineConfig({
  testDir: path.join(rootDir, 'tests/e2e'),
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 2,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'reports/e2e-results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://demo-app-svc:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // 注意：無 webServer — Demo App 以 K8s Service 形式執行
});
