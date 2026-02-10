@regression
Feature: 儀表板
  作為一個已登入的使用者
  我想要看到系統的統計資訊和最近訂單
  以便了解整體業務狀況

  Background:
    Given 我已登入系統
    And 我在儀表板頁面

  @smoke @critical
  Scenario: 儀表板顯示統計數據
    Then 我應該看到總使用者數
    And 我應該看到本月訂單數
    And 我應該看到本月營收
    And 我應該看到滿意度

  Scenario: 儀表板顯示圖表區域
    Then 我應該看到月度趨勢圖區域

  Scenario: 儀表板顯示最近訂單表格
    Then 我應該看到最近訂單表格
    And 訂單列表應該至少有 1 筆資料

  Scenario: 儀表板顯示使用者名稱
    Then 我應該看到歡迎訊息包含 "管理員"
