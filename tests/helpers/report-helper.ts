import fs from 'fs';
import path from 'path';

/** 測試報告結果介面 */
interface TestResult {
  status: 'passed' | 'failed' | 'skipped' | 'timedOut';
  duration: number;
  title: string;
}

interface TestSuite {
  title: string;
  tests: TestResult[];
}

interface ReportSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  passRate: number;
  duration: number;
}

/** 報告輔助工具 */
export class ReportHelper {
  /** 解析 Playwright JSON 報告 */
  static parseJsonReport(reportPath: string): ReportSummary {
    const raw = fs.readFileSync(reportPath, 'utf-8');
    const report = JSON.parse(raw);

    let total = 0, passed = 0, failed = 0, skipped = 0, duration = 0;

    for (const suite of report.suites || []) {
      for (const spec of suite.specs || []) {
        for (const test of spec.tests || []) {
          total++;
          duration += test.results?.[0]?.duration || 0;
          const status = test.results?.[0]?.status;
          if (status === 'passed') passed++;
          else if (status === 'failed' || status === 'timedOut') failed++;
          else skipped++;
        }
      }
    }

    return {
      total,
      passed,
      failed,
      skipped,
      passRate: total > 0 ? Math.round((passed / total) * 10000) / 100 : 0,
      duration,
    };
  }

  /** 檢查是否通過 Release Gate（通過率 >= threshold） */
  static checkReleaseGate(reportPath: string, threshold: number = 95): boolean {
    const summary = this.parseJsonReport(reportPath);
    console.log(`測試摘要: 總計 ${summary.total}, 通過 ${summary.passed}, 失敗 ${summary.failed}, 通過率 ${summary.passRate}%`);
    return summary.passRate >= threshold;
  }

  /** 產生簡易文字摘要 */
  static generateSummary(reportPath: string): string {
    const summary = this.parseJsonReport(reportPath);
    return [
      '=== 測試執行摘要 ===',
      `總測試數: ${summary.total}`,
      `通過: ${summary.passed}`,
      `失敗: ${summary.failed}`,
      `跳過: ${summary.skipped}`,
      `通過率: ${summary.passRate}%`,
      `總執行時間: ${(summary.duration / 1000).toFixed(2)}s`,
      `Release Gate: ${summary.passRate >= 95 ? 'PASS ✓' : 'FAIL ✗'}`,
    ].join('\n');
  }
}
