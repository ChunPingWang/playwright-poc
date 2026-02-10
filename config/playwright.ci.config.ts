import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: 'tests/steps/**/*.ts',
});

/** CI 專用設定 - 較嚴格的重試與平行度控制 */
export default defineConfig({
  testDir,
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: true,
  retries: 2,
  workers: 2,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'node src/demo-app/api-mock-server.js',
    port: 3000,
    reuseExistingServer: false,
    timeout: 15000,
  },
});
