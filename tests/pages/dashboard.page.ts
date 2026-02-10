import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

/** 儀表板頁面物件 */
export class DashboardPage extends BasePage {
  // Locators
  private userDisplay = '#user-display';
  private logoutButton = '#logout-btn';
  private totalUsers = '#total-users';
  private totalOrders = '#total-orders';
  private totalRevenue = '#total-revenue';
  private satisfactionRate = '#satisfaction-rate';
  private chartArea = '[data-testid="chart-area"]';
  private ordersTable = '[data-testid="recent-orders"]';
  private navDashboard = 'a[href="/dashboard.html"]';
  private navForm = 'a[href="/form.html"]';

  constructor(page: Page) {
    super(page);
  }

  /** 前往儀表板 */
  async goto(): Promise<void> {
    await this.navigate('/dashboard.html');
    await this.waitForLoad();
  }

  /** 取得使用者顯示名稱 */
  async getUserDisplayName(): Promise<string> {
    return this.getText(this.userDisplay);
  }

  /** 點擊登出 */
  async clickLogout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  /** 取得總使用者數 */
  async getTotalUsers(): Promise<string> {
    return this.getText(this.totalUsers);
  }

  /** 取得總訂單數 */
  async getTotalOrders(): Promise<string> {
    return this.getText(this.totalOrders);
  }

  /** 取得營收 */
  async getRevenue(): Promise<string> {
    return this.getText(this.totalRevenue);
  }

  /** 取得滿意度 */
  async getSatisfaction(): Promise<string> {
    return this.getText(this.satisfactionRate);
  }

  /** 驗證圖表區域可見 */
  async isChartVisible(): Promise<boolean> {
    return this.page.locator(this.chartArea).isVisible();
  }

  /** 驗證訂單表格可見 */
  async isOrdersTableVisible(): Promise<boolean> {
    return this.page.locator(this.ordersTable).isVisible();
  }

  /** 取得訂單列數 */
  async getOrderRowCount(): Promise<number> {
    return this.page.locator(`${this.ordersTable} tbody tr`).count();
  }

  /** 導覽至表單頁 */
  async navigateToForm(): Promise<void> {
    await this.click(this.navForm);
  }

  /** 驗證是否在儀表板頁面 */
  async expectToBeOnDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard\.html/);
  }

  /** 等待資料載入完成（統計數字不再是 '--'） */
  async waitForDataLoaded(): Promise<void> {
    await this.page.waitForFunction(
      () => document.getElementById('total-users')?.textContent !== '--'
    );
  }
}
