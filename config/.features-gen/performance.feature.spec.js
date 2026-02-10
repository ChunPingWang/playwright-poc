// Generated from: ../tests/features/performance.feature
import { test } from "playwright-bdd";

test.describe('效能指標蒐集', () => {

  test('登入頁面載入時間應在合理範圍', { tag: ['@performance', '@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我開始計時'); 
    await When('我前往登入頁面', null, { page }); 
    await Then('頁面載入時間應該小於 3 秒'); 
  });

  test('儀表板頁面載入時間應在合理範圍', { tag: ['@performance', '@regression'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('我已登入系統', null, { page }); 
    await And('我開始計時'); 
    await When('我前往儀表板頁面', null, { page }); 
    await Then('頁面載入時間應該小於 5 秒'); 
  });

  test('蒐集 Web Vitals 指標', { tag: ['@performance', '@regression'] }, async ({ Given, When, Then, page }) => { 
    await Given('我已登入系統', null, { page }); 
    await When('我前往儀表板頁面', null, { page }); 
    await Then('我應該能蒐集到頁面效能指標', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('../tests/features/performance.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@performance","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given 我開始計時","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When 我前往登入頁面","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then 頁面載入時間應該小於 3 秒","stepMatchArguments":[{"group":{"start":11,"value":"3","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":12,"pickleLine":12,"tags":["@performance","@regression"],"steps":[{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"And 我開始計時","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When 我前往儀表板頁面","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then 頁面載入時間應該小於 5 秒","stepMatchArguments":[{"group":{"start":11,"value":"5","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":19,"pickleLine":18,"tags":["@performance","@regression"],"steps":[{"pwStepLine":20,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given 我已登入系統","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When 我前往儀表板頁面","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then 我應該能蒐集到頁面效能指標","stepMatchArguments":[]}]},
]; // bdd-data-end