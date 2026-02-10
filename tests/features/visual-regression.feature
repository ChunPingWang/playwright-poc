@visual @regression
Feature: 視覺回歸測試
  作為一個測試工程師
  我想要比對頁面截圖確認 UI 沒有非預期的變更
  以便確保視覺一致性

  @critical
  Scenario: 登入頁面視覺比對
    Given 我在登入頁面
    Then 登入頁面的截圖應該與基準線一致

  Scenario: 儀表板頁面視覺比對
    Given 我已登入系統
    And 我在儀表板頁面
    Then 儀表板頁面的截圖應該與基準線一致

  Scenario: 表單頁面視覺比對
    Given 我已登入系統
    And 我在表單頁面
    Then 表單頁面的截圖應該與基準線一致
