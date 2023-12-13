const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
  settings: {
    'import/resolver': {
      webpack: {
        config: [
          path.resolve(__dirname, 'webpack.dev.config.js'),
          path.resolve(__dirname, 'webpack.prod.config.js'),
        ],
      },
    },
  },
  rules: {
    'react/function-component-definition': 'off',
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: __dirname,
      },
    ],

  },
});
