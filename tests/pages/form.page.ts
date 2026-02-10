import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

/** 表單頁面物件 */
export class FormPage extends BasePage {
  // Locators
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private emailInput = '#email';
  private phoneInput = '#phone';
  private departmentSelect = '#department';
  private messageTextarea = '#message';
  private agreeTerms = '#agree-terms';
  private submitButton = '#submit-btn';
  private resetButton = '#reset-btn';
  private successMessage = '#success-msg';

  // Error locators
  private firstNameError = '#first-name-error';
  private lastNameError = '#last-name-error';
  private emailError = '#email-error';
  private phoneError = '#phone-error';
  private departmentError = '#department-error';
  private termsError = '#terms-error';

  constructor(page: Page) {
    super(page);
  }

  /** 前往表單頁 */
  async goto(): Promise<void> {
    await this.navigate('/form.html');
    await this.waitForLoad();
  }

  /** 填寫姓氏 */
  async fillFirstName(value: string): Promise<void> {
    await this.fill(this.firstNameInput, value);
  }

  /** 填寫名字 */
  async fillLastName(value: string): Promise<void> {
    await this.fill(this.lastNameInput, value);
  }

  /** 填寫電子郵件 */
  async fillEmail(value: string): Promise<void> {
    await this.fill(this.emailInput, value);
  }

  /** 填寫電話 */
  async fillPhone(value: string): Promise<void> {
    await this.fill(this.phoneInput, value);
  }

  /** 選擇部門 */
  async selectDepartment(value: string): Promise<void> {
    await this.page.locator(this.departmentSelect).selectOption(value);
  }

  /** 填寫備註 */
  async fillMessage(value: string): Promise<void> {
    await this.fill(this.messageTextarea, value);
  }

  /** 勾選同意條款 */
  async checkAgreeTerms(): Promise<void> {
    await this.page.locator(this.agreeTerms).check();
  }

  /** 點擊提交 */
  async clickSubmit(): Promise<void> {
    await this.click(this.submitButton);
  }

  /** 點擊重置 */
  async clickReset(): Promise<void> {
    await this.click(this.resetButton);
  }

  /** 填寫完整表單 */
  async fillCompleteForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department: string;
    message?: string;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    if (data.phone) await this.fillPhone(data.phone);
    await this.selectDepartment(data.department);
    if (data.message) await this.fillMessage(data.message);
    await this.checkAgreeTerms();
  }

  /** 驗證成功訊息是否顯示 */
  async isSuccessMessageVisible(): Promise<boolean> {
    return this.page.locator(this.successMessage).isVisible();
  }

  /** 等待成功訊息出現 */
  async waitForSuccessMessage(): Promise<void> {
    await this.page.locator(`${this.successMessage}.visible`).waitFor({ state: 'visible' });
  }

  /** 驗證各欄位錯誤是否顯示 */
  async isFirstNameErrorVisible(): Promise<boolean> {
    return this.page.locator(`${this.firstNameError}.visible`).isVisible();
  }
  async isLastNameErrorVisible(): Promise<boolean> {
    return this.page.locator(`${this.lastNameError}.visible`).isVisible();
  }
  async isEmailErrorVisible(): Promise<boolean> {
    return this.page.locator(`${this.emailError}.visible`).isVisible();
  }
  async isDepartmentErrorVisible(): Promise<boolean> {
    return this.page.locator(`${this.departmentError}.visible`).isVisible();
  }
  async isTermsErrorVisible(): Promise<boolean> {
    return this.page.locator(`${this.termsError}.visible`).isVisible();
  }

  /** 驗證是否在表單頁面 */
  async expectToBeOnFormPage(): Promise<void> {
    await expect(this.page).toHaveURL(/form\.html/);
  }
}
