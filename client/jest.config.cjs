/** @type {import('jest').Config} */
const config = {
  testEnvironment: '<rootDir>/jest-environment-jsdom.cjs',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

module.exports = config;
