const { createConfig } = require('@openedx/frontend-base/tools');

module.exports = createConfig('test', {
  // setupFilesAfterEnv is used after the jest environment has been loaded.  In general this is what you want.
  // If you want to add config BEFORE jest loads, use setupFiles instead.
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.js',
  ],
  coveragePathIgnorePatterns: [
    'src/setupTest.js',
    'src/i18n',
    'src/__mocks__',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/svg.ts',
    '\\.png$': '<rootDir>/src/__mocks__/file.ts',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
});
