'use strict'

const OFF = 0
// const ERROR = 2

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    // 使 @typescript-eslint 中样式规范失效，遵循 prettier 样式规范
    'prettier/@typescript-eslint',
    // 使用 prettier 的样式规范且 ESLint 检测出的格式问题输出 error 或 warning
    'plugin:prettier/recommended'
  ],
  plugins: ['html', '@typescript-eslint', 'import', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    // 自动发现 React 版本
    react: {
      pragma: 'React',
      // Tells eslint-plugin-react to automatically detect the version of React to use
      version: 'detect'
    }
  },
  rules: {
    'max-params': OFF,
    'react/prop-types': OFF,
    'react/jsx-uses-react': OFF,
    'react/react-in-jsx-scope': OFF,
    'react/no-unescaped-entities': OFF,
    'react/jsx-no-comment-textnodes': OFF,
    '@typescript-eslint/no-unused-vars': OFF,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/explicit-member-accessibility': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/ban-ts-comment': OFF
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-require-imports': 0
      }
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': OFF
      }
    },
    {
      files: ['scripts/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': OFF
      }
    }
  ]
}
