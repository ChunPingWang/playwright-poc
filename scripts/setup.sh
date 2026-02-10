#!/bin/bash
# 環境初始化腳本
# 用途：一鍵設定開發/測試環境

set -e

echo "=== Playwright PoC 環境初始化 ==="
echo ""

# 檢查 Node.js
if ! command -v node &> /dev/null; then
  echo "錯誤：請先安裝 Node.js (>= 18)"
  exit 1
fi

NODE_VERSION=$(node -v)
echo "Node.js 版本: $NODE_VERSION"

# 安裝依賴
echo ""
echo ">> 安裝 npm 依賴..."
npm ci

# 安裝 Playwright 瀏覽器
echo ""
echo ">> 安裝 Playwright 瀏覽器..."
npx playwright install --with-deps

# 產生 BDD 測試檔
echo ""
echo ">> 產生 BDD 測試檔..."
npx bddgen --config config/playwright.config.ts

# 建立 .env（若不存在）
if [ ! -f .env ]; then
  echo ""
  echo ">> 建立 .env 設定檔..."
  cp .env.example .env
fi

echo ""
echo "=== 初始化完成！==="
echo ""
echo "快速開始："
echo "  npm run app:start    # 啟動 Demo App"
echo "  npm run test:smoke   # 執行冒煙測試"
echo "  npm run test:bdd     # 執行 BDD 測試"
echo "  npm run test:e2e     # 執行 E2E 測試"
echo "  npm run test:all     # 執行全部測試"
