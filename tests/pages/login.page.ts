import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

/** 登入頁面物件 */
export class LoginPage extends BasePage {
  // Locators
  private usernameInput = '#username';
  private passwordInput = '#password';
  private loginButton = '#login-btn';
  private loginError = '#login-error';
  private rememberMe = '#remember-me';
  private usernameError = '#username-error';
  private passwordError = '#password-error';

  constructor(page: Page) {
    super(page);
  }

  /** 前往登入頁 */
  async goto(): Promise<void> {
    await this.navigate('/login.html');
    await this.waitForLoad();
  }

  /** 輸入帳號 */
  async fillUsername(username: string): Promise<void> {
    await this.fill(this.usernameInput, username);
  }

  /** 輸入密碼 */
  async fillPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  /** 點擊登入按鈕 */
  async clickLogin(): Promise<void> {
    await this.click(this.loginButton);
  }

  /** 勾選記住我 */
  async checkRememberMe(): Promise<void> {
    await this.page.locator(this.rememberMe).check();
  }

  /** 執行登入（完整流程） */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /** 取得登入錯誤訊息 */
  async getLoginError(): Promise<string> {
    await this.page.locator(this.loginError).waitFor({ state: 'visible', timeout: 5000 });
    return this.getText(this.loginError);
  }

  /** 驗證帳號欄位錯誤是否顯示 */
  async isUsernameErrorVisible(): Promise<boolean> {
    return this.page.locator(this.usernameError).isVisible();
  }

  /** 驗證密碼欄位錯誤是否顯示 */
  async isPasswordErrorVisible(): Promise<boolean> {
    return this.page.locator(this.passwordError).isVisible();
  }

  /** 驗證是否在登入頁 */
  async expectToBeOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/login\.html/);
  }

  /** 驗證登入按鈕狀態 */
  async isLoginButtonEnabled(): Promise<boolean> {
    return this.page.locator(this.loginButton).isEnabled();
  }
}
