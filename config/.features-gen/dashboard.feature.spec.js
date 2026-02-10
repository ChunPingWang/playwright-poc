// Generated from: ../tests/features/dashboard.feature
import { test } from "playwright-bdd";

test.describe('儀表板', () => {

  test.beforeEach('Background', async ({ Given, And, page }, testInfo) => { if (testInfo.error) return;
    await Given('我已登入系統', null, { page }); 
    await And('我在儀表板頁面', null, { page }); 
  });
  
  test('儀表板顯示統計數據', { tag: ['@regression', '@smoke', '@critical'] }, async ({ Then, And, page }) => { 
    await Then('我應該看到總使用者數', null, { page }); 
    await And('我應該看到本月訂單數', null, { page }); 
    await And('我應該看到本月營收', null, { page }); 
    await And('我應該看到滿意度', null, { page }); 
  });

  test('儀表板顯示圖表區域', { tag: ['@regression'] }, async ({ Then, page }) => { 
    await Then('我應該看到月度趨勢圖區域', null, { page }); 
  });

  test('儀表板顯示最近訂單表格', { tag: ['@regression'] }, async ({ Then, And, page }) => { 
    await Then('我應該看到最近訂單表格', null, { page }); 
    await And('訂單列表應該至少有 1 筆資料', null, { page }); 
  });

  test('儀表板顯示使用者名稱', { tag: ['@regression'] }, async ({ Then, page }) => { 
    await Then('我應該看到歡迎訊息包含 "管理員"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/dashboard.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":11,"pickleLine":12,"tags":["@regression","@smoke","@critical"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在儀表板頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到總使用者數","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And 我應該看到本月訂單數","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And 我應該看到本月營收","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And 我應該看到滿意度","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":18,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在儀表板頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到月度趨勢圖區域","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":21,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在儀表板頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到最近訂單表格","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And 訂單列表應該至少有 1 筆資料","stepMatchArguments":[{"group":{"start":10,"value":"1","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":27,"pickleLine":25,"tags":["@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And 我在儀表板頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到歡迎訊息包含 \"管理員\"","stepMatchArguments":[{"group":{"start":12,"value":"\"管理員\"","children":[{"start":13,"value":"管理員","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end