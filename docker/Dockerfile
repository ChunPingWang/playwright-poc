FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /app

# 複製 package files
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm ci

# 複製所有專案檔案
COPY . .

# 產生 BDD 測試檔
RUN npx bddgen --config config/playwright.config.ts

# 建立報告目錄（供 K8s PVC 掛載）
RUN mkdir -p /app/reports /app/playwright-report /app/test-results /app/screenshots

# 預設執行所有 BDD 測試（Chromium）
CMD ["npx", "playwright", "test", "--config=config/playwright.config.ts", "--project=chromium"]
