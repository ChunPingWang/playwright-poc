// Generated from: ../tests/features/navigation.feature
import { test } from "playwright-bdd";

test.describe('頁面導覽', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('我已登入系統', null, { page }); 
  });
  
  test('從儀表板導覽到表單頁', { tag: ['@smoke', '@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我在儀表板頁面', null, { page }); 
    await When('我點擊導覽列的 "表單範例" 連結', null, { page }); 
    await Then('我應該被導向到表單頁面', null, { page }); 
  });

  test('從表單頁導覽回儀表板', { tag: ['@smoke', '@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我在表單頁面', null, { page }); 
    await When('我點擊導覽列的 "儀表板" 連結', null, { page }); 
    await Then('我應該被導向到儀表板頁面', null, { page }); 
  });

  test('登出後導向至登入頁', { tag: ['@smoke', '@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我在儀表板頁面', null, { page }); 
    await When('我點擊登出按鈕', null, { page }); 
    await Then('我應該被導向到登入頁面', null, { page }); 
  });

  test('未登入時存取受保護頁面會被導向登入頁', { tag: ['@smoke', '@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我已登出系統', null, { page }); 
    await When('我嘗試直接存取儀表板頁面', null, { page }); 
    await Then('我應該被導向到登入頁面', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/navigation.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":10,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given 我在儀表板頁面","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When 我點擊導覽列的 \"表單範例\" 連結","stepMatchArguments":[{"group":{"start":8,"value":"\"表單範例\"","children":[{"start":9,"value":"表單範例","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then 我應該被導向到表單頁面","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":15,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given 我在表單頁面","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When 我點擊導覽列的 \"儀表板\" 連結","stepMatchArguments":[{"group":{"start":8,"value":"\"儀表板\"","children":[{"start":9,"value":"儀表板","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then 我應該被導向到儀表板頁面","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":20,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given 我在儀表板頁面","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When 我點擊登出按鈕","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then 我應該被導向到登入頁面","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":25,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given 我已登出系統","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When 我嘗試直接存取儀表板頁面","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then 我應該被導向到登入頁面","stepMatchArguments":[]}]},
]; // bdd-data-end