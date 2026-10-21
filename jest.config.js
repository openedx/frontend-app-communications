const { createConfig } = require('@openedx/frontend-base/tools');

const mergedConfig = createConfig('test', {
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
    '\\.svg$': '<rootDir>/src/__mocks__/svg.js',
    '\\.png$': '<rootDir>/src/__mocks__/file.js',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
});

// Limit ts-jest diagnostics to test files so type errors in transformed
// dependencies (included via transformIgnorePatterns) don't fail the run.
mergedConfig.transform['^.+\\.[tj]sx?$'] = [
  'ts-jest',
  {
    diagnostics: {
      exclude: ['!**/*.test.*'],
    },
  },
];

module.exports = mergedConfig;
