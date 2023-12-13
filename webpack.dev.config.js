const path = require('path');
const { createConfig } = require('@edx/frontend-build');

const config = createConfig('webpack-dev');

/**
 * Webpack5 is now stricter when evaluating import statements. By default, Webpack5 expects import statements to include
 * file extensions now.
 *
 * We want to be able to support overriding and injecting a branded header and footer in the MFE. However, the header
 * and footer components have dependencies using older versions of Babel that are not Webpack5 compliant.
 *
 * This rule allows us to workaround the issue by telling Webpack to not be so strict.
 *
 * The solution is pulled from
 * https://stackoverflow.com/questions/65922329/babel-cant-resolve-imports-in-it-its-own-source-code and more details
 * can be found here: https://github.com/webpack/webpack/issues/11467#issuecomment-808618999/
 */
const webpack5esmInteropRule = {
  test: /\.m?js/,
  resolve: {
    fullySpecified: false,
  },
};

const otherRules = config.module.rules;

config.module.rules = [webpack5esmInteropRule, ...otherRules];

const alias = {
  '@node_modules': path.resolve(__dirname, 'node_modules'),
};

config.resolve.alias = { ...config.resolve.alias, ...alias };

module.exports = config;
