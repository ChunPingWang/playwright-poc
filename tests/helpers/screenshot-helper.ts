import { Page } from '@playwright/test';
import path from 'path';

/** 截圖工具 - 統一管理截圖的命名和儲存 */
export class ScreenshotHelper {
  private screenshotDir: string;

  constructor(screenshotDir: string = 'screenshots') {
    this.screenshotDir = screenshotDir;
  }

  /** 全頁截圖 */
  async captureFullPage(page: Page, name: string): Promise<string> {
    const filePath = path.join(this.screenshotDir, `${name}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  }

  /** 元素截圖 */
  async captureElement(page: Page, selector: string, name: string): Promise<string> {
    const filePath = path.join(this.screenshotDir, `${name}.png`);
    await page.locator(selector).screenshot({ path: filePath });
    return filePath;
  }

  /** 帶時間戳記的截圖（適用於偵錯） */
  async captureWithTimestamp(page: Page, prefix: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const name = `${prefix}-${timestamp}`;
    return this.captureFullPage(page, name);
  }
}
