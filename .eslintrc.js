'use strict'
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'comma-dangle': ["error", {
      "arrays": "always",
      "objects": "always",
      "imports": "ignore",
      "exports": "ignore",
      "functions": "ignore"
    }],
    'object-curly-spacing' : "off",
    'indent': 'off',
    'vue/script-indent': ["error", 2, {"baseIndent": 1}],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
