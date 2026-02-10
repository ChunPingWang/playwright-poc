@regression
Feature: API 攔截與 Mock
  作為一個測試工程師
  我想要能夠攔截和模擬 API 回應
  以便測試各種前端行為和邊界情況

  Background:
    Given 我已登入系統

  Scenario: 攔截 Dashboard API 並回傳自定義資料
    Given 我設定 Dashboard API 回傳自定義統計資料
    When 我前往儀表板頁面
    Then 我應該看到自定義的統計數據

  Scenario: 模擬 API 錯誤回應
    Given 我設定 Dashboard API 回傳 500 錯誤
    When 我前往儀表板頁面
    Then 儀表板應該顯示載入狀態

  Scenario: 監控登入 API 請求
    Given 我在登入頁面
    When 我監控 API 請求並執行登入
    Then 應該有一個 POST 請求到 "/api/login"
