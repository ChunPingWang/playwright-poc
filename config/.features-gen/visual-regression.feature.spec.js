// Generated from: ../tests/features/visual-regression.feature
import { test } from "playwright-bdd";

test.describe('視覺回歸測試', () => {

  test('登入頁面視覺比對', { tag: ['@visual', '@regression', '@critical'] }, async ({ Given, Then, page }) => { 
    await Given('我在登入頁面', null, { page }); 
    await Then('登入頁面的截圖應該與基準線一致', null, { page }); 
  });

  test('儀表板頁面視覺比對', { tag: ['@visual', '@regression'] }, async ({ Given, Then, And, page }) => { 
    await Given('我已登入系統', null, { page }); 
    await And('我在儀表板頁面', null, { page }); 
    await Then('儀表板頁面的截圖應該與基準線一致', null, { page }); 
  });

  test('表單頁面視覺比對', { tag: ['@visual', '@regression'] }, async ({ Given, Then, And, page }) => { 
    await Given('我已登入系統', null, { page }); 
    await And('我在表單頁面', null, { page }); 
    await Then('表單頁面的截圖應該與基準線一致', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/visual-regression.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":["@visual","@regression","@critical"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then 登入頁面的截圖應該與基準線一致","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":12,"tags":["@visual","@regression"],"steps":[{"pwStepLine":12,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"And 我在儀表板頁面","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then 儀表板頁面的截圖應該與基準線一致","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":17,"tags":["@visual","@regression"],"steps":[{"pwStepLine":18,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"And 我在表單頁面","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then 表單頁面的截圖應該與基準線一致","stepMatchArguments":[]}]},
]; // bdd-data-end