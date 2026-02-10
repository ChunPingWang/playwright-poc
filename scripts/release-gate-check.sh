#!/bin/bash
# Release Gate 通過率檢查腳本
# 用途：解析 Playwright JSON 報告，判斷測試通過率是否達到閾值
# 使用方式：bash release-gate-check.sh <report-path> <threshold>

REPORT_PATH=${1:-"reports/results.json"}
THRESHOLD=${2:-95}

echo "=== Release Gate 檢查 ==="
echo "報告路徑: $REPORT_PATH"
echo "通過率閾值: ${THRESHOLD}%"
echo ""

if [ ! -f "$REPORT_PATH" ]; then
  echo "錯誤：找不到報告檔案 $REPORT_PATH"
  exit 1
fi

# 使用 node 解析 JSON 報告
RESULT=$(node -e "
const fs = require('fs');
const report = JSON.parse(fs.readFileSync('$REPORT_PATH', 'utf-8'));

let total = 0, passed = 0, failed = 0, skipped = 0;

function countTests(suites) {
  for (const suite of suites || []) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests || []) {
        total++;
        const status = test.results?.[0]?.status || test.status;
        if (status === 'passed' || status === 'expected') passed++;
        else if (status === 'failed' || status === 'timedOut' || status === 'unexpected') failed++;
        else skipped++;
      }
    }
    if (suite.suites) countTests(suite.suites);
  }
}

countTests(report.suites);
const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;

console.log(JSON.stringify({ total, passed, failed, skipped, passRate: parseFloat(passRate) }));
")

TOTAL=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8'));console.log(d.total)")
PASSED=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8'));console.log(d.passed)")
FAILED=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8'));console.log(d.failed)")
SKIPPED=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8'));console.log(d.skipped)")
PASS_RATE=$(echo "$RESULT" | node -e "const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8'));console.log(d.passRate)")

echo "測試結果摘要："
echo "  總測試數: $TOTAL"
echo "  通過: $PASSED"
echo "  失敗: $FAILED"
echo "  跳過: $SKIPPED"
echo "  通過率: ${PASS_RATE}%"
echo ""

# 比較通過率
GATE_PASS=$(node -e "console.log($PASS_RATE >= $THRESHOLD ? 'true' : 'false')")

if [ "$GATE_PASS" = "true" ]; then
  echo "Release Gate: PASS"
  echo "通過率 ${PASS_RATE}% >= 閾值 ${THRESHOLD}%，允許上版。"
  exit 0
else
  echo "Release Gate: FAIL"
  echo "通過率 ${PASS_RATE}% < 閾值 ${THRESHOLD}%，禁止上版！"
  exit 1
fi
