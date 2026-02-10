FROM mcr.microsoft.com/playwright:v1.52.0-noble

WORKDIR /app

# 複製 package files
COPY package.json package-lock.json ./

# 安裝依賴
RUN npm ci

# 複製所有專案檔案
COPY . .

# 產生 BDD 測試檔
RUN npx bddgen --config config/playwright.config.ts

# 預設執行所有 BDD 測試（Chromium）
CMD ["npx", "playwright", "test", "--config=config/playwright.config.ts", "--project=chromium"]
