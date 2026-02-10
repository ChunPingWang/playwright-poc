@regression
Feature: 表單驗證
  作為一個已登入的使用者
  我想要在提交表單時得到即時的欄位驗證回饋
  以便正確填寫所有必填資料

  Background:
    Given 我已登入系統
    And 我在表單頁面

  @critical
  Scenario: 提交空白表單顯示所有必填錯誤
    When 我直接點擊提交按鈕
    Then 我應該看到姓氏欄位錯誤提示
    And 我應該看到名字欄位錯誤提示
    And 我應該看到電子郵件欄位錯誤提示
    And 我應該看到部門欄位錯誤提示
    And 我應該看到條款欄位錯誤提示

  Scenario: 填寫完整表單後成功提交
    When 我填寫完整的聯絡人表單
      | 欄位     | 值                |
      | 姓氏     | 王                |
      | 名字     | 大明              |
      | 電子郵件 | wang@example.com  |
      | 電話     | 0912-345-678      |
      | 部門     | engineering       |
      | 備註     | 測試備註          |
    And 我勾選同意條款
    And 我點擊提交按鈕
    Then 我應該看到表單提交成功訊息

  Scenario: 輸入無效電子郵件格式
    When 我填寫電子郵件 "invalid-email"
    And 我填寫其他必填欄位
    And 我點擊提交按鈕
    Then 我應該看到電子郵件欄位錯誤提示

  Scenario: 重置表單清空所有欄位
    When 我填寫完整的聯絡人表單
      | 欄位     | 值                |
      | 姓氏     | 王                |
      | 名字     | 大明              |
      | 電子郵件 | wang@example.com  |
      | 部門     | engineering       |
    And 我點擊重置按鈕
    Then 所有欄位應該被清空
