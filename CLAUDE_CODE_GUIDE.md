# Claude Code 開發快速參考卡

## 開發流程 (依序執行)

### 🔹 Step 1: 初始化
```
讀取 PROJECT_PLAN.md，然後執行 Step 1 專案初始化。
建立 package.json、安裝所有依賴、設定 tsconfig.json。
完成後列出已安裝的套件清單。
```

### 🔹 Step 2: Demo App
```
依照 PROJECT_PLAN.md Step 2 建立 Demo Web App。
需要：登入頁(帳密驗證)、Dashboard(含圖表區)、表單頁(含驗證)、Mock API Server。
所有頁面要有足夠的 HTML 元素和互動，供後續 Playwright 測試使用。
啟動 server 確認可正常存取。
```

### 🔹 Step 3: 設定檔
```
依照 PROJECT_PLAN.md Step 3 建立所有設定檔：
- playwright.config.ts (多瀏覽器、reporter、截圖錄影)
- playwright.ci.config.ts (CI 專用，retries、workers)
- cucumber.js (BDD 設定)
- environments.ts (SIT/UAT/Staging URL 切換)
```

### 🔹 Step 4: Page Object Model
```
依照 PROJECT_PLAN.md Step 4 建立 Page Object Model：
- base.page.ts (共用方法：navigate、waitFor、getTitle、screenshot)
- login.page.ts (登入/登出操作)
- dashboard.page.ts (Dashboard 元素操作)
- form.page.ts (表單填寫和驗證)
使用 TypeScript，嚴格型別。
```

### 🔹 Step 5: BDD Features + Steps (核心)
```
依照 PROJECT_PLAN.md Step 5 建立所有 8 個 BDD Feature Files 
和對應的 Step Definitions。每個 feature 要有：
- 清楚的 Gherkin 語法 (Given/When/Then)
- 適當的 Tag (@smoke, @regression 等)
- Scenario Outline 展示 data-driven
- 中英混合註解
建立後逐一執行確認通過。
```

### 🔹 Step 6: 純 Playwright 測試
```
依照 PROJECT_PLAN.md Step 6 建立純 Playwright 測試：
- smoke.spec.ts (@smoke 快速冒煙)
- cross-browser.spec.ts (多瀏覽器矩陣)
- mobile-responsive.spec.ts (RWD 驗證)
- parallel-demo.spec.ts (平行執行展示)
執行確認通過。
```

### 🔹 Step 7: Fixtures & Helpers
```
依照 PROJECT_PLAN.md Step 7 建立：
- test-fixtures.ts (自定義 fixture，擴展 Playwright test)
- auth.fixture.ts (認證狀態儲存和重用)
- test-data.ts (測試資料工廠)
- screenshot-helper.ts (截圖比對工具)
- report-helper.ts (報告輔助)
```

### 🔹 Step 8: Docker
```
依照 PROJECT_PLAN.md Step 8 建立：
- Dockerfile (基於 mcr.microsoft.com/playwright 官方映像)
- docker-compose.yml (一鍵啟動測試)
確認 docker build 可成功 (不需要實際跑 container)。
```

### 🔹 Step 9: CI/CD Workflows
```
依照 PROJECT_PLAN.md Step 9 建立 GitHub Actions：
- ui-test-pr.yml (PR 觸發，只跑 @smoke，單瀏覽器，block PR)
- ui-test-nightly.yml (每日排程，完整回歸，多瀏覽器)
- ui-test-release-gate.yml (release/* 分支觸發，包含 visual + a11y)
- release-gate-check.sh (解析 JSON 報告，判斷通過率 ≥ 95%)
```

### 🔹 Step 10: 執行腳本
```
依照 PROJECT_PLAN.md Step 10 建立 shell scripts：
- setup.sh (環境初始化，安裝瀏覽器)
- run-tests.sh (支援參數：--smoke / --regression / --visual)
- generate-report.sh (產生 Allure 報告)
```

### 🔹 Step 11: 驗證
```
執行所有測試，確認全部通過：
1. npm run test:smoke
2. npm run test:bdd
3. npm run test:all
列出執行結果摘要。如有失敗，修復後重跑。
```

### 🔹 Step 12: README.md (最後)
```
所有功能已完成並驗證通過。
現在依照 PROJECT_PLAN.md Step 12 撰寫 README.md，包含：
- 專案簡介和功能清單
- 快速開始 (Quick Start)
- 專案結構說明
- 所有展示功能的詳細說明
- CI/CD 整合方案（三層測試策略）
- Release Gate 上版前測試的做法與可行性分析
- Docker 使用說明
- 架構決策紀錄 (ADR)
README 要專業、完整，適合給團隊和主管審閱。
```

---

## ⚡ 常用驗證指令

```bash
# 跑所有 BDD 測試
npx bddgen && npx playwright test

# 只跑 smoke
npx playwright test --grep @smoke

# 指定瀏覽器
npx playwright test --project=chromium

# 看報告
npx playwright show-report

# Docker 執行
docker-compose -f docker/docker-compose.yml up --build
```
