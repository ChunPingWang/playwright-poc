#!/bin/bash
# 測試報告產生腳本
# 用途：產生 HTML 報告或 Allure 報告

set -e

MODE=${1:-"html"}

echo "=== 產生測試報告 ==="
echo "報告類型: $MODE"
echo ""

case $MODE in
  html)
    echo ">> 開啟 Playwright HTML 報告..."
    npx playwright show-report
    ;;
  allure)
    if [ -d "allure-results" ]; then
      echo ">> 產生 Allure 報告..."
      npx allure generate allure-results -o allure-report --clean
      echo ">> 開啟 Allure 報告..."
      npx allure open allure-report
    else
      echo "錯誤：找不到 allure-results 目錄"
      echo "請先使用 Allure reporter 執行測試"
      exit 1
    fi
    ;;
  summary)
    if [ -f "reports/results.json" ]; then
      echo ">> 測試結果摘要："
      node -e "
        const fs = require('fs');
        const report = JSON.parse(fs.readFileSync('reports/results.json', 'utf-8'));
        let total = 0, passed = 0, failed = 0;
        function count(suites) {
          for (const s of suites || []) {
            for (const spec of s.specs || []) {
              for (const t of spec.tests || []) {
                total++;
                const st = t.results?.[0]?.status || t.status;
                if (st === 'passed' || st === 'expected') passed++;
                else failed++;
              }
            }
            if (s.suites) count(s.suites);
          }
        }
        count(report.suites);
        const rate = total > 0 ? ((passed/total)*100).toFixed(1) : 0;
        console.log('  總測試數:', total);
        console.log('  通過:', passed);
        console.log('  失敗:', failed);
        console.log('  通過率:', rate + '%');
      "
    else
      echo "錯誤：找不到 reports/results.json"
      exit 1
    fi
    ;;
  *)
    echo "使用方式: bash generate-report.sh [html|allure|summary]"
    exit 1
    ;;
esac
