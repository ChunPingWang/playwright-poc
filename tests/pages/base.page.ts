import { Page } from '@playwright/test';

/** 頁面基底類別 - 封裝共用操作 */
export class BasePage {
  constructor(protected page: Page) {}

  /** 導覽至指定路徑 */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /** 等待頁面載入完成 */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /** 取得頁面標題 */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /** 取得目前 URL */
  getCurrentURL(): string {
    return this.page.url();
  }

  /** 截圖 */
  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /** 等待元素可見 */
  async waitForVisible(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  /** 等待元素隱藏 */
  async waitForHidden(selector: string): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'hidden' });
  }

  /** 取得元素文字 */
  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) || '';
  }

  /** 點擊元素 */
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  /** 填入文字 */
  async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }
}
