// Generated from: ../tests/features/accessibility.feature
import { test } from "playwright-bdd";

test.describe('無障礙測試 (Accessibility)', () => {

  test('登入頁面無障礙檢查', { tag: ['@a11y', '@regression'] }, async ({ Given, Then, page }) => { 
    await Given('我在登入頁面', null, { page }); 
    await Then('登入頁面應該通過無障礙檢查', null, { page }); 
  });

  test('儀表板頁面無障礙檢查', { tag: ['@a11y', '@regression'] }, async ({ Given, Then, And, page }) => { 
    await Given('我已登入系統', null, { page }); 
    await And('我在儀表板頁面', null, { page }); 
    await Then('儀表板頁面應該通過無障礙檢查', null, { page }); 
  });

  test('表單頁面無障礙檢查', { tag: ['@a11y', '@regression'] }, async ({ Given, Then, And, page }) => { 
    await Given('我已登入系統', null, { page }); 
    await And('我在表單頁面', null, { page }); 
    await Then('表單頁面應該通過無障礙檢查', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/accessibility.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@a11y","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我在登入頁面","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then 登入頁面應該通過無障礙檢查","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":11,"tags":["@a11y","@regression"],"steps":[{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"And 我在儀表板頁面","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then 儀表板頁面應該通過無障礙檢查","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":16,"tags":["@a11y","@regression"],"steps":[{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"And 我在表單頁面","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then 表單頁面應該通過無障礙檢查","stepMatchArguments":[]}]},
]; // bdd-data-end