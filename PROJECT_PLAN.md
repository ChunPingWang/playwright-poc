# Playwright + BDD PoC 專案計畫

## 🎯 專案目標

建立一個完整的 Playwright + BDD (Cucumber) PoC，展示企業級 UI 自動化測試框架的所有核心能力，並整合至 CI/CD 流程，作為上版前 UI 回歸測試的標準方案。

---

## 📐 架構設計

```
playwright-bdd-poc/
├── .github/
│   └── workflows/
│       ├── ui-test-pr.yml              # PR 觸發的 UI 測試
│       ├── ui-test-nightly.yml         # 每日排程完整回歸測試
│       └── ui-test-release-gate.yml    # Release Gate (上版前閘門)
├── src/
│   └── demo-app/                       # 簡易 Demo Web App (測試標的)
│       ├── index.html
│       ├── login.html
│       ├── dashboard.html
│       ├── form.html
│       ├── api-mock-server.js          # Mock API Server
│       └── styles.css
├── tests/
│   ├── features/                       # BDD Feature Files (Gherkin)
│   │   ├── login.feature
│   │   ├── navigation.feature
│   │   ├── form-validation.feature
│   │   ├── dashboard.feature
│   │   ├── api-intercept.feature
│   │   ├── visual-regression.feature
│   │   ├── accessibility.feature
│   │   └── performance.feature
│   ├── steps/                          # Step Definitions
│   │   ├── common.steps.ts
│   │   ├── login.steps.ts
│   │   ├── navigation.steps.ts
│   │   ├── form.steps.ts
│   │   ├── dashboard.steps.ts
│   │   ├── api.steps.ts
│   │   ├── visual.steps.ts
│   │   ├── accessibility.steps.ts
│   │   └── performance.steps.ts
│   ├── pages/                          # Page Object Model
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── dashboard.page.ts
│   │   └── form.page.ts
│   ├── fixtures/                       # Test Fixtures & Custom Extensions
│   │   ├── test-fixtures.ts
│   │   └── auth.fixture.ts
│   ├── helpers/                        # Utility & Helper Functions
│   │   ├── test-data.ts
│   │   ├── screenshot-helper.ts
│   │   └── report-helper.ts
│   └── e2e/                            # 純 Playwright 測試 (非 BDD)
│       ├── smoke.spec.ts
│       ├── cross-browser.spec.ts
│       ├── mobile-responsive.spec.ts
│       └── parallel-demo.spec.ts
├── config/
│   ├── playwright.config.ts            # 主設定檔
│   ├── playwright.ci.config.ts         # CI 專用設定
│   ├── cucumber.js                     # Cucumber 設定
│   └── environments.ts                 # 環境設定 (SIT/UAT/PROD)
├── reports/                            # 測試報告輸出目錄
│   └── .gitkeep
├── screenshots/                        # Visual Regression 基準線
│   └── .gitkeep
├── docker/
│   ├── Dockerfile                      # 測試執行容器
│   └── docker-compose.yml              # 本機整合測試
├── scripts/
│   ├── setup.sh                        # 環境初始化
│   ├── run-tests.sh                    # 測試執行腳本
│   ├── generate-report.sh              # 報告產生
│   └── release-gate-check.sh           # Release Gate 判斷腳本
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md                           # 最後完成
```

---

## 🔧 技術棧

| 技術 | 用途 | 版本策略 |
|------|------|----------|
| **Playwright** | UI 自動化測試核心 | Latest stable |
| **playwright-bdd** | Playwright + Cucumber 整合 | Latest stable |
| **@cucumber/cucumber** | BDD / Gherkin 解析 | Latest stable |
| **TypeScript** | 型別安全 | 5.x |
| **@axe-core/playwright** | 無障礙測試 | Latest stable |
| **allure-playwright** | 企業級測試報告 | Latest stable |
| **Express** | Demo App & Mock API | Latest stable |
| **Docker** | 容器化測試執行 | - |

---

## 📋 功能展示清單 (Feature Matrix)

### Phase 1: 基礎能力
| # | 功能 | Feature File | 說明 |
|---|------|-------------|------|
| 1 | **BDD / Gherkin 整合** | login.feature | Given/When/Then 完整流程 |
| 2 | **Page Object Model** | pages/*.ts | 封裝頁面操作，提升可維護性 |
| 3 | **多瀏覽器測試** | cross-browser.spec.ts | Chromium / Firefox / WebKit |
| 4 | **行動裝置模擬** | mobile-responsive.spec.ts | iPhone / Android viewport |
| 5 | **截圖與錄影** | playwright.config.ts | 失敗自動截圖、全程錄影 |

### Phase 2: 進階能力
| # | 功能 | Feature File | 說明 |
|---|------|-------------|------|
| 6 | **API Mocking / Intercept** | api-intercept.feature | Route intercept, mock response |
| 7 | **Network 攔截** | api.steps.ts | 監控 XHR/Fetch 請求 |
| 8 | **表單驗證測試** | form-validation.feature | Input validation, error message |
| 9 | **Visual Regression** | visual-regression.feature | 像素比對截圖差異 |
| 10 | **無障礙測試 (a11y)** | accessibility.feature | axe-core WCAG 2.1 AA |

### Phase 3: 企業級能力
| # | 功能 | Feature File | 說明 |
|---|------|-------------|------|
| 11 | **平行執行** | parallel-demo.spec.ts | Worker-based 平行 |
| 12 | **測試資料管理** | test-data.ts | Data-driven testing, Scenario Outline |
| 13 | **Custom Fixtures** | test-fixtures.ts | 認證狀態重用、Session Storage |
| 14 | **效能指標蒐集** | performance.feature | Web Vitals, 頁面載入時間 |
| 15 | **多環境設定** | environments.ts | SIT / UAT / Staging 切換 |
| 16 | **企業級報告** | Allure + HTML | 趨勢圖、失敗截圖、步驟明細 |
| 17 | **CI/CD 整合** | .github/workflows/ | PR Gate + Nightly + Release Gate |
| 18 | **Docker 容器化** | docker/ | 一致的測試執行環境 |

---

## 🚀 CI/CD 整合設計

### 三層測試策略

```
┌─────────────────────────────────────────────────────┐
│                  CI/CD Pipeline                      │
│                                                      │
│  ┌──────────┐   ┌──────────────┐   ┌──────────────┐ │
│  │ PR Gate  │──▶│  Nightly     │──▶│ Release Gate │ │
│  │ (快速)   │   │  (完整回歸)  │   │ (上版閘門)   │ │
│  └──────────┘   └──────────────┘   └──────────────┘ │
│                                                      │
│  ● Smoke Test   ● Full Regression  ● Full + Visual  │
│  ● 單瀏覽器    ● 多瀏覽器        ● 多瀏覽器       │
│  ● < 5 min     ● < 30 min        ● < 30 min       │
│  ● @smoke tag  ● All features    ● All + a11y     │
│  ● Block PR    ● Report only     ● Block Release  │
│                                                      │
│  觸發: PR 建立   觸發: 每日排程    觸發: Release分支 │
└─────────────────────────────────────────────────────┘
```

### Release Gate 流程 (上版前 UI 測試)

```
開發完成 ──▶ PR Merge to develop ──▶ Deploy to SIT
                                          │
                                    ┌─────▼──────┐
                                    │ UI Smoke    │ ◀── PR Gate
                                    │ Test (自動) │
                                    └─────┬──────┘
                                          │ Pass
                                    ┌─────▼──────┐
                                    │ Deploy to   │
                                    │ UAT/Staging │
                                    └─────┬──────┘
                                          │
                                    ┌─────▼──────────┐
                                    │ Full Regression │ ◀── Release Gate
                                    │ + Visual + a11y │
                                    │ (自動 + 報告)   │
                                    └─────┬──────────┘
                                          │
                                    ┌─────▼──────┐
                                    │  Gate 判斷   │
                                    │ Pass Rate   │
                                    │ ≥ 95%?      │
                                    └──┬──────┬───┘
                                   Yes │      │ No
                                 ┌─────▼┐  ┌──▼─────┐
                                 │ 放行  │  │ 攔截   │
                                 │上版   │  │修復後  │
                                 │      │  │重測    │
                                 └──────┘  └────────┘
```

---

## 📝 開發步驟 (Claude Code 執行順序)

### Step 1: 專案初始化
```bash
# 初始化 Node.js 專案
npm init -y

# 安裝核心依賴
npm install -D @playwright/test playwright-bdd @cucumber/cucumber
npm install -D typescript @types/node ts-node
npm install -D @axe-core/playwright
npm install -D allure-playwright allure-commandline

# 安裝 Demo App 依賴
npm install express

# 安裝 Playwright 瀏覽器
npx playwright install --with-deps

# TypeScript 設定
npx tsc --init
```

### Step 2: 建立 Demo Web App
- 建立簡易登入頁、Dashboard、表單頁面
- 建立 Mock API Server (Express)
- 確保有足夠的 UI 元素供測試

### Step 3: 設定檔建立
- playwright.config.ts (本機開發用)
- playwright.ci.config.ts (CI 環境用)
- cucumber.js (BDD 設定)
- environments.ts (多環境)
- tsconfig.json

### Step 4: Page Object Model
- base.page.ts → 共用方法 (navigate, waitFor, screenshot)
- login.page.ts → 登入頁操作
- dashboard.page.ts → Dashboard 操作
- form.page.ts → 表單操作

### Step 5: BDD Feature Files + Step Definitions
依照 Feature Matrix 順序建立：
1. login.feature + login.steps.ts
2. navigation.feature + navigation.steps.ts
3. form-validation.feature + form.steps.ts
4. dashboard.feature + dashboard.steps.ts
5. api-intercept.feature + api.steps.ts
6. visual-regression.feature + visual.steps.ts
7. accessibility.feature + accessibility.steps.ts
8. performance.feature + performance.steps.ts

### Step 6: 純 Playwright 測試 (非 BDD)
- smoke.spec.ts
- cross-browser.spec.ts
- mobile-responsive.spec.ts
- parallel-demo.spec.ts

### Step 7: Custom Fixtures & Helpers
- test-fixtures.ts (認證 fixture)
- auth.fixture.ts (登入狀態重用)
- test-data.ts (測試資料)
- screenshot-helper.ts
- report-helper.ts

### Step 8: Docker 容器化
- Dockerfile (基於 mcr.microsoft.com/playwright)
- docker-compose.yml

### Step 9: CI/CD Workflows
- ui-test-pr.yml
- ui-test-nightly.yml
- ui-test-release-gate.yml
- release-gate-check.sh

### Step 10: 測試執行腳本
- setup.sh
- run-tests.sh
- generate-report.sh

### Step 11: 執行驗證
- 本機執行全部測試確認通過
- 產生測試報告
- 驗證 Docker 建置

### Step 12: README.md
- 專案說明
- 功能清單
- 快速開始
- CI/CD 整合說明
- 架構決策紀錄 (ADR)

---

## 🏷️ Gherkin Tag 策略

| Tag | 用途 | 執行時機 |
|-----|------|----------|
| `@smoke` | 冒煙測試 | PR Gate, 每次部署後 |
| `@regression` | 完整回歸 | Nightly, Release Gate |
| `@visual` | 視覺比對 | Release Gate |
| `@a11y` | 無障礙測試 | Release Gate |
| `@performance` | 效能測試 | Nightly |
| `@wip` | 開發中 | 僅本機 |
| `@skip` | 暫時跳過 | - |
| `@critical` | 關鍵路徑 | 所有階段 |

---

## 📊 測試報告策略

| 報告類型 | 工具 | 用途 |
|----------|------|------|
| HTML Report | Playwright built-in | 快速本機檢視 |
| Allure Report | allure-playwright | 企業級報告、趨勢追蹤 |
| JUnit XML | Playwright reporter | CI/CD 整合 (Jenkins/GitLab) |
| JSON Report | Custom | Release Gate 自動判斷 |

---

## ⚙️ 關鍵設定參數

### playwright.config.ts 重點
```typescript
{
  testDir: './tests',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,        // CI 重試
  workers: process.env.CI ? 2 : undefined, // CI 平行度
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['json', { outputFile: 'reports/results.json' }]
  ],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
}
```

---

## 🔑 成功指標

| 指標 | 目標 |
|------|------|
| PoC 所有測試通過 | ✅ 100% |
| 多瀏覽器覆蓋 | Chromium + Firefox + WebKit |
| BDD Feature 數量 | ≥ 8 個 |
| CI 執行時間 (Smoke) | < 5 分鐘 |
| CI 執行時間 (Full) | < 30 分鐘 |
| Release Gate 自動判斷 | 通過率 ≥ 95% 放行 |
| Docker 可執行 | ✅ |

---

## 📌 Claude Code 開發指引

在 Claude Code 中開發時，請依照以下順序：

1. **先讀此計畫** → 了解全局架構
2. **依 Step 1-11 順序開發** → 每步完成後驗證
3. **每個 Feature 完成後立即執行測試** → 確保可運行
4. **最後寫 README.md** → 基於實際實作結果

### Claude Code 提示範例

```
請依照 PROJECT_PLAN.md 的 Step 1 初始化專案，
安裝所有依賴並建立 tsconfig.json
```

```
請依照 PROJECT_PLAN.md 的 Step 2 建立 Demo Web App，
包含登入頁、Dashboard、表單頁和 Mock API Server
```

```
請依照 PROJECT_PLAN.md 的 Step 5 建立所有 BDD Feature Files 
和對應的 Step Definitions，確保每個 feature 都能執行
```

```
所有功能開發完成，請執行全部測試確認通過，
然後依照 PROJECT_PLAN.md 的 Step 12 撰寫 README.md
```
