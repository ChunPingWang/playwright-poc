@a11y @regression
Feature: 無障礙測試 (Accessibility)
  作為一個測試工程師
  我想要確保所有頁面符合 WCAG 2.1 AA 標準
  以便讓所有使用者都能正常使用系統

  Scenario: 登入頁面無障礙檢查
    Given 我在登入頁面
    Then 登入頁面應該通過無障礙檢查

  Scenario: 儀表板頁面無障礙檢查
    Given 我已登入系統
    And 我在儀表板頁面
    Then 儀表板頁面應該通過無障礙檢查

  Scenario: 表單頁面無障礙檢查
    Given 我已登入系統
    And 我在表單頁面
    Then 表單頁面應該通過無障礙檢查
