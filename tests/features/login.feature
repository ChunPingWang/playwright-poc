@smoke @regression
Feature: 使用者登入
  作為一個系統使用者
  我想要能夠使用帳號密碼登入系統
  以便存取受保護的功能

  Background:
    Given 我在登入頁面

  @critical
  Scenario: 使用正確帳密登入成功
    When 我輸入帳號 "admin" 和密碼 "admin123"
    And 我點擊登入按鈕
    Then 我應該被導向到儀表板頁面
    And 我應該看到歡迎訊息包含 "管理員"

  Scenario: 使用錯誤帳密登入失敗
    When 我輸入帳號 "admin" 和密碼 "wrongpass"
    And 我點擊登入按鈕
    Then 我應該看到登入錯誤訊息 "帳號或密碼錯誤"

  Scenario: 帳號欄位為空時顯示錯誤
    When 我輸入帳號 "" 和密碼 "admin123"
    And 我點擊登入按鈕
    Then 我應該看到帳號欄位錯誤提示

  Scenario: 密碼欄位為空時顯示錯誤
    When 我輸入帳號 "admin" 和密碼 ""
    And 我點擊登入按鈕
    Then 我應該看到密碼欄位錯誤提示

  Scenario Outline: 多組帳號登入測試 (Data-Driven)
    When 我輸入帳號 "<username>" 和密碼 "<password>"
    And 我點擊登入按鈕
    Then 登入結果應該是 "<result>"

    Examples:
      | username | password  | result |
      | admin    | admin123  | 成功   |
      | user     | user123   | 成功   |
      | test     | test123   | 成功   |
      | admin    | wrong     | 失敗   |
      | unknown  | admin123  | 失敗   |
