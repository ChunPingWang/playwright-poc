// Generated from: ../tests/features/login.feature
import { test } from "playwright-bdd";

test.describe('使用者登入', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('我在登入頁面', null, { page }); 
  });
  
  test('使用正確帳密登入成功', { tag: ['@smoke', '@regression', '@critical'] }, async ({ When, Then, And, page }) => { 
    await When('我輸入帳號 "admin" 和密碼 "admin123"', null, { page }); 
    await And('我點擊登入按鈕', null, { page }); 
    await Then('我應該被導向到儀表板頁面', null, { page }); 
    await And('我應該看到歡迎訊息包含 "管理員"', null, { page }); 
  });

  test('使用錯誤帳密登入失敗', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
    await When('我輸入帳號 "admin" 和密碼 "wrongpass"', null, { page }); 
    await And('我點擊登入按鈕', null, { page }); 
    await Then('我應該看到登入錯誤訊息 "帳號或密碼錯誤"', null, { page }); 
  });

  test('帳號欄位為空時顯示錯誤', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
    await When('我輸入帳號 "" 和密碼 "admin123"', null, { page }); 
    await And('我點擊登入按鈕', null, { page }); 
    await Then('我應該看到帳號欄位錯誤提示', null, { page }); 
  });

  test('密碼欄位為空時顯示錯誤', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
    await When('我輸入帳號 "admin" 和密碼 ""', null, { page }); 
    await And('我點擊登入按鈕', null, { page }); 
    await Then('我應該看到密碼欄位錯誤提示', null, { page }); 
  });

  test.describe('多組帳號登入測試 (Data-Driven)', () => {

    test('Example #1', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
      await When('我輸入帳號 "admin" 和密碼 "admin123"', null, { page }); 
      await And('我點擊登入按鈕', null, { page }); 
      await Then('登入結果應該是 "成功"', null, { page }); 
    });

    test('Example #2', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
      await When('我輸入帳號 "user" 和密碼 "user123"', null, { page }); 
      await And('我點擊登入按鈕', null, { page }); 
      await Then('登入結果應該是 "成功"', null, { page }); 
    });

    test('Example #3', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
      await When('我輸入帳號 "test" 和密碼 "test123"', null, { page }); 
      await And('我點擊登入按鈕', null, { page }); 
      await Then('登入結果應該是 "成功"', null, { page }); 
    });

    test('Example #4', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
      await When('我輸入帳號 "admin" 和密碼 "wrong"', null, { page }); 
      await And('我點擊登入按鈕', null, { page }); 
      await Then('登入結果應該是 "失敗"', null, { page }); 
    });

    test('Example #5', { tag: ['@smoke', '@regression'] }, async ({ When, Then, And, page }) => { 
      await When('我輸入帳號 "unknown" 和密碼 "admin123"', null, { page }); 
      await And('我點擊登入按鈕', null, { page }); 
      await Then('登入結果應該是 "失敗"', null, { page }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":11,"tags":["@smoke","@regression","@critical"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"admin\" 和密碼 \"admin123\"","stepMatchArguments":[{"group":{"start":6,"value":"\"admin\"","children":[{"start":7,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":18,"value":"\"admin123\"","children":[{"start":19,"value":"admin123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then 我應該被導向到儀表板頁面","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And 我應該看到歡迎訊息包含 \"管理員\"","stepMatchArguments":[{"group":{"start":12,"value":"\"管理員\"","children":[{"start":13,"value":"管理員","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":17,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"admin\" 和密碼 \"wrongpass\"","stepMatchArguments":[{"group":{"start":6,"value":"\"admin\"","children":[{"start":7,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":18,"value":"\"wrongpass\"","children":[{"start":19,"value":"wrongpass","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到登入錯誤訊息 \"帳號或密碼錯誤\"","stepMatchArguments":[{"group":{"start":12,"value":"\"帳號或密碼錯誤\"","children":[{"start":13,"value":"帳號或密碼錯誤","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":23,"pickleLine":22,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"\" 和密碼 \"admin123\"","stepMatchArguments":[{"group":{"start":6,"value":"\"\"","children":[{"start":7,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":13,"value":"\"admin123\"","children":[{"start":14,"value":"admin123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到帳號欄位錯誤提示","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":27,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"admin\" 和密碼 \"\"","stepMatchArguments":[{"group":{"start":6,"value":"\"admin\"","children":[{"start":7,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":18,"value":"\"\"","children":[{"start":19,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then 我應該看到密碼欄位錯誤提示","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":39,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"admin\" 和密碼 \"admin123\"","stepMatchArguments":[{"group":{"start":6,"value":"\"admin\"","children":[{"start":7,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":18,"value":"\"admin123\"","children":[{"start":19,"value":"admin123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then 登入結果應該是 \"成功\"","stepMatchArguments":[{"group":{"start":8,"value":"\"成功\"","children":[{"start":9,"value":"成功","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":43,"pickleLine":40,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"user\" 和密碼 \"user123\"","stepMatchArguments":[{"group":{"start":6,"value":"\"user\"","children":[{"start":7,"value":"user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":17,"value":"\"user123\"","children":[{"start":18,"value":"user123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then 登入結果應該是 \"成功\"","stepMatchArguments":[{"group":{"start":8,"value":"\"成功\"","children":[{"start":9,"value":"成功","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":49,"pickleLine":41,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"test\" 和密碼 \"test123\"","stepMatchArguments":[{"group":{"start":6,"value":"\"test\"","children":[{"start":7,"value":"test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":17,"value":"\"test123\"","children":[{"start":18,"value":"test123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":51,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then 登入結果應該是 \"成功\"","stepMatchArguments":[{"group":{"start":8,"value":"\"成功\"","children":[{"start":9,"value":"成功","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":55,"pickleLine":42,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"admin\" 和密碼 \"wrong\"","stepMatchArguments":[{"group":{"start":6,"value":"\"admin\"","children":[{"start":7,"value":"admin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":18,"value":"\"wrong\"","children":[{"start":19,"value":"wrong","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then 登入結果應該是 \"失敗\"","stepMatchArguments":[{"group":{"start":8,"value":"\"失敗\"","children":[{"start":9,"value":"失敗","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":61,"pickleLine":43,"tags":["@smoke","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","isBg":true,"stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When 我輸入帳號 \"unknown\" 和密碼 \"admin123\"","stepMatchArguments":[{"group":{"start":6,"value":"\"unknown\"","children":[{"start":7,"value":"unknown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":20,"value":"\"admin123\"","children":[{"start":21,"value":"admin123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And 我點擊登入按鈕","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then 登入結果應該是 \"失敗\"","stepMatchArguments":[{"group":{"start":8,"value":"\"失敗\"","children":[{"start":9,"value":"失敗","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end