@performance @regression
Feature: 效能指標蒐集
  作為一個測試工程師
  我想要蒐集頁面載入效能指標
  以便監控系統效能是否符合標準

  Scenario: 登入頁面載入時間應在合理範圍
    Given 我開始計時
    When 我前往登入頁面
    Then 頁面載入時間應該小於 3 秒

  Scenario: 儀表板頁面載入時間應在合理範圍
    Given 我已登入系統
    And 我開始計時
    When 我前往儀表板頁面
    Then 頁面載入時間應該小於 5 秒

  Scenario: 蒐集 Web Vitals 指標
    Given 我已登入系統
    When 我前往儀表板頁面
    Then 我應該能蒐集到頁面效能指標
