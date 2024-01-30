/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.dev.config.js'),
      },
      alias: {
        map: [
          ['@communications-app', '.'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  overrides: [
    {
      files: ['plugins/**/*.jsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
});
