// Generated from: ../tests/features/api-intercept.feature
import { test } from "playwright-bdd";

test.describe('API 攔截與 Mock', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('我已登入系統', null, { page }); 
  });
  
  test('攔截 Dashboard API 並回傳自定義資料', { tag: ['@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我設定 Dashboard API 回傳自定義統計資料', null, { page }); 
    await When('我前往儀表板頁面', null, { page }); 
    await Then('我應該看到自定義的統計數據', null, { page }); 
  });

  test('模擬 API 錯誤回應', { tag: ['@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我設定 Dashboard API 回傳 500 錯誤', null, { page }); 
    await When('我前往儀表板頁面', null, { page }); 
    await Then('儀表板應該顯示載入狀態', null, { page }); 
  });

  test('監控登入 API 請求', { tag: ['@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我在登入頁面', null, { page }); 
    await When('我監控 API 請求並執行登入', null, { page }); 
    await Then('應該有一個 POST 請求到 "/api/login"'); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/api-intercept.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":10,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given 我設定 Dashboard API 回傳自定義統計資料","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When 我前往儀表板頁面","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到自定義的統計數據","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":15,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given 我設定 Dashboard API 回傳 500 錯誤","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When 我前往儀表板頁面","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then 儀表板應該顯示載入狀態","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":20,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When 我監控 API 請求並執行登入","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then 應該有一個 POST 請求到 \"/api/login\"","stepMatchArguments":[{"group":{"start":15,"value":"\"/api/login\"","children":[{"start":16,"value":"/api/login","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end