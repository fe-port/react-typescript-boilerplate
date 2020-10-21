'use strict'

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties'
    // 'stylelint-scss'
  ],
  rules: {
    'comment-empty-line-before': null,
    'function-name-case': ['lower'],
    'no-invalid-double-slash-comments': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'no-empty-source': null,
    'no-descending-specificity': null,
    //https://github.com/stylelint/stylelint/issues/4114
    'function-calc-no-invalid': null,
    'function-url-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null, // iconfont
    'plugin/declaration-block-no-ignored-properties': true,
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }]
  },
  ignoreFiles: [
    '.eslintrc.js',
    '.huskyrc.js',
    '.lintstagedrc.js',
    '.prettierrc.js',
    '.stylelintrc.js',
    'babel.config.js',
    '*.md',
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    'node_modules/**/*',
    'src/assets/**/*',
    'dist/**/*',
    '**/typings/**/*'
  ]
}
