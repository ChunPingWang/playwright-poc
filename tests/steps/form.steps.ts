import { createBdd, DataTable } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { FormPage } from '../pages/form.page';

const { When, Then } = createBdd();

When('我直接點擊提交按鈕', async ({ page }) => {
  const formPage = new FormPage(page);
  await formPage.clickSubmit();
});

When('我填寫完整的聯絡人表單', async ({ page }, dataTable: DataTable) => {
  const formPage = new FormPage(page);
  const hashes = dataTable.hashes();
  for (const row of hashes) {
    const field = row['欄位'];
    const value = row['值'];
    switch (field) {
      case '姓氏': await formPage.fillFirstName(value); break;
      case '名字': await formPage.fillLastName(value); break;
      case '電子郵件': await formPage.fillEmail(value); break;
      case '電話': await formPage.fillPhone(value); break;
      case '部門': await formPage.selectDepartment(value); break;
      case '備註': await formPage.fillMessage(value); break;
    }
  }
});

When('我勾選同意條款', async ({ page }) => {
  await page.locator('#agree-terms').check();
});

When('我點擊提交按鈕', async ({ page }) => {
  await page.locator('#submit-btn').click();
});

When('我填寫電子郵件 {string}', async ({ page }, email: string) => {
  await page.locator('#email').fill(email);
});

When('我填寫其他必填欄位', async ({ page }) => {
  const formPage = new FormPage(page);
  await formPage.fillFirstName('測試');
  await formPage.fillLastName('使用者');
  await formPage.selectDepartment('engineering');
  await formPage.checkAgreeTerms();
});

When('我點擊重置按鈕', async ({ page }) => {
  await page.locator('#reset-btn').click();
});

Then('我應該看到姓氏欄位錯誤提示', async ({ page }) => {
  await expect(page.locator('#first-name-error.visible')).toBeVisible();
});

Then('我應該看到名字欄位錯誤提示', async ({ page }) => {
  await expect(page.locator('#last-name-error.visible')).toBeVisible();
});

Then('我應該看到電子郵件欄位錯誤提示', async ({ page }) => {
  await expect(page.locator('#email-error.visible')).toBeVisible();
});

Then('我應該看到部門欄位錯誤提示', async ({ page }) => {
  await expect(page.locator('#department-error.visible')).toBeVisible();
});

Then('我應該看到條款欄位錯誤提示', async ({ page }) => {
  await expect(page.locator('#terms-error.visible')).toBeVisible();
});

Then('我應該看到表單提交成功訊息', async ({ page }) => {
  await expect(page.locator('#success-msg')).toHaveClass(/.*visible.*/, { timeout: 10000 });
});

Then('所有欄位應該被清空', async ({ page }) => {
  await expect(page.locator('#first-name')).toHaveValue('');
  await expect(page.locator('#last-name')).toHaveValue('');
  await expect(page.locator('#email')).toHaveValue('');
});
