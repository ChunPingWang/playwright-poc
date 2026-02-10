@smoke @regression
Feature: 頁面導覽
  作為一個已登入的使用者
  我想要能夠在不同頁面之間切換
  以便使用系統各項功能

  Background:
    Given 我已登入系統

  Scenario: 從儀表板導覽到表單頁
    Given 我在儀表板頁面
    When 我點擊導覽列的 "表單範例" 連結
    Then 我應該被導向到表單頁面

  Scenario: 從表單頁導覽回儀表板
    Given 我在表單頁面
    When 我點擊導覽列的 "儀表板" 連結
    Then 我應該被導向到儀表板頁面

  Scenario: 登出後導向至登入頁
    Given 我在儀表板頁面
    When 我點擊登出按鈕
    Then 我應該被導向到登入頁面

  Scenario: 未登入時存取受保護頁面會被導向登入頁
    Given 我已登出系統
    When 我嘗試直接存取儀表板頁面
    Then 我應該被導向到登入頁面
