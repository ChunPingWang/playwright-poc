/** Cucumber 設定檔 */
module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    require: ['tests/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    publishQuiet: true,
  },
};
