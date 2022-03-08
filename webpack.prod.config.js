const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-prod');

config.module.rules[0].exclude = /node_modules\/(?!(tinymce|@tinymce|@edx))/;

/**
 * See comment in webpack.dev.config.js for details on this rule and why it is needed.
 */
const webpack5esmInteropRule = {
  test: /\.m?js/,
  resolve: {
    fullySpecified: false,
  },
};

const otherRules = config.module.rules;

config.module.rules = [webpack5esmInteropRule, ...otherRules];

module.exports = config;
