// Generated from: ../tests/features/form-validation.feature
import { test } from "playwright-bdd";

test.describe('表單驗證', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('我已登入系統', null, { page }); 
    await And('我在表單頁面', null, { page }); 
  });
  
  test('提交空白表單顯示所有必填錯誤', { tag: ['@regression', '@critical'] }, async ({ When, Then, And, page }) => { 
    await When('我直接點擊提交按鈕', null, { page }); 
    await Then('我應該看到姓氏欄位錯誤提示', null, { page }); 
    await And('我應該看到名字欄位錯誤提示', null, { page }); 
    await And('我應該看到電子郵件欄位錯誤提示', null, { page }); 
    await And('我應該看到部門欄位錯誤提示', null, { page }); 
    await And('我應該看到條款欄位錯誤提示', null, { page }); 
  });

  test('填寫完整表單後成功提交', { tag: ['@regression'] }, async ({ When, Then, And, page }) => { 
    await When('我填寫完整的聯絡人表單', {"dataTable":{"rows":[{"cells":[{"value":"欄位"},{"value":"值"}]},{"cells":[{"value":"姓氏"},{"value":"王"}]},{"cells":[{"value":"名字"},{"value":"大明"}]},{"cells":[{"value":"電子郵件"},{"value":"wang@example.com"}]},{"cells":[{"value":"電話"},{"value":"0912-345-678"}]},{"cells":[{"value":"部門"},{"value":"engineering"}]},{"cells":[{"value":"備註"},{"value":"測試備註"}]}]}}, { page }); 
    await And('我勾選同意條款', null, { page }); 
    await And('我點擊提交按鈕', null, { page }); 
    await Then('我應該看到表單提交成功訊息', null, { page }); 
  });

  test('輸入無效電子郵件格式', { tag: ['@regression'] }, async ({ When, Then, And, page }) => { 
    await When('我填寫電子郵件 "invalid-email"', null, { page }); 
    await And('我填寫其他必填欄位', null, { page }); 
    await And('我點擊提交按鈕', null, { page }); 
    await Then('我應該看到電子郵件欄位錯誤提示', null, { page }); 
  });

  test('重置表單清空所有欄位', { tag: ['@regression'] }, async ({ When, Then, And, page }) => { 
    await When('我填寫完整的聯絡人表單', {"dataTable":{"rows":[{"cells":[{"value":"欄位"},{"value":"值"}]},{"cells":[{"value":"姓氏"},{"value":"王"}]},{"cells":[{"value":"名字"},{"value":"大明"}]},{"cells":[{"value":"電子郵件"},{"value":"wang@example.com"}]},{"cells":[{"value":"部門"},{"value":"engineering"}]}]}}, { page }); 
    await And('我點擊重置按鈕', null, { page }); 
    await Then('所有欄位應該被清空', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/form-validation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@regression","@critical"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在表單頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When 我直接點擊提交按鈕","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到姓氏欄位錯誤提示","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And 我應該看到名字欄位錯誤提示","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 我應該看到電子郵件欄位錯誤提示","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And 我應該看到部門欄位錯誤提示","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And 我應該看到條款欄位錯誤提示","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":20,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在表單頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When 我填寫完整的聯絡人表單","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And 我勾選同意條款","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"And 我點擊提交按鈕","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到表單提交成功訊息","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":33,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在表單頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When 我填寫電子郵件 \"invalid-email\"","stepMatchArguments":[{"group":{"start":8,"value":"\"invalid-email\"","children":[{"start":9,"value":"invalid-email","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And 我填寫其他必填欄位","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And 我點擊提交按鈕","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到電子郵件欄位錯誤提示","stepMatchArguments":[]}]},
  {"pwTestLine":34,"pickleLine":39,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在表單頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When 我填寫完整的聯絡人表單","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"And 我點擊重置按鈕","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then 所有欄位應該被清空","stepMatchArguments":[]}]},
]; // bdd-data-end