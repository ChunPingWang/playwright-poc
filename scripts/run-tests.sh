#!/bin/bash
# 測試執行腳本
# 用途：支援多種測試模式的統一入口
# 使用方式：
#   bash run-tests.sh                    # 執行全部測試
#   bash run-tests.sh --smoke            # 只跑冒煙測試
#   bash run-tests.sh --regression       # 完整回歸測試
#   bash run-tests.sh --visual           # 視覺回歸測試
#   bash run-tests.sh --a11y             # 無障礙測試
#   bash run-tests.sh --e2e              # E2E 測試
#   bash run-tests.sh --browser firefox  # 指定瀏覽器

set -e

MODE="all"
BROWSER="chromium"

# 解析參數
while [[ $# -gt 0 ]]; do
  case $1 in
    --smoke)      MODE="smoke"; shift ;;
    --regression) MODE="regression"; shift ;;
    --visual)     MODE="visual"; shift ;;
    --a11y)       MODE="a11y"; shift ;;
    --e2e)        MODE="e2e"; shift ;;
    --browser)    BROWSER="$2"; shift 2 ;;
    --help)
      echo "使用方式: bash run-tests.sh [選項]"
      echo ""
      echo "選項:"
      echo "  --smoke        冒煙測試（@smoke 標籤）"
      echo "  --regression   完整回歸測試"
      echo "  --visual       視覺回歸測試（@visual 標籤）"
      echo "  --a11y         無障礙測試（@a11y 標籤）"
      echo "  --e2e          E2E 測試（非 BDD）"
      echo "  --browser NAME 指定瀏覽器（chromium/firefox/webkit）"
      echo "  --help         顯示此說明"
      exit 0
      ;;
    *) echo "未知參數: $1"; exit 1 ;;
  esac
done

echo "=== Playwright PoC 測試執行 ==="
echo "測試模式: $MODE"
echo "瀏覽器: $BROWSER"
echo ""

# 確保 BDD 測試檔已產生
npx bddgen --config config/playwright.config.ts 2>/dev/null

case $MODE in
  smoke)
    echo ">> 執行冒煙測試..."
    npx playwright test --config=config/playwright.config.ts --grep @smoke --project=$BROWSER
    ;;
  regression)
    echo ">> 執行完整回歸測試..."
    npx playwright test --config=config/playwright.config.ts --project=$BROWSER
    npx playwright test --config=config/playwright.e2e.config.ts --project=$BROWSER
    ;;
  visual)
    echo ">> 執行視覺回歸測試..."
    npx playwright test --config=config/playwright.config.ts --grep @visual --project=$BROWSER
    ;;
  a11y)
    echo ">> 執行無障礙測試..."
    npx playwright test --config=config/playwright.config.ts --grep @a11y --project=$BROWSER
    ;;
  e2e)
    echo ">> 執行 E2E 測試..."
    npx playwright test --config=config/playwright.e2e.config.ts --project=$BROWSER
    ;;
  all)
    echo ">> 執行全部測試..."
    npx playwright test --config=config/playwright.config.ts --project=$BROWSER
    npx playwright test --config=config/playwright.e2e.config.ts --project=$BROWSER
    ;;
esac

echo ""
echo "=== 測試完成 ==="
