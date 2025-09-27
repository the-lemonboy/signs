import { defineConfig } from '@repo/eslint-config'

export default defineConfig({
  extends: ['@repo/eslint-config'],
  parserOptions: {
    project: './tsconfig.app.json',
  },
  env: {
    browser: true,
    es2020: true,
  },
  rules: {
    // 项目特定规则可以在这里覆盖
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
})
