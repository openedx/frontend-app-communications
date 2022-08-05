// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig(
  'eslint',
  {
    rules: {
      'template-curly-spacing': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/jsx-no-bind': [0, { ignoreDOMComponents: true }],
    },
  },
);
