const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, 'webpack.dev.config.js'),
      },
    },
  },
  rules: {
    'react/function-component-definition': 'off',
    'import/prefer-default-export': 'off',
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
