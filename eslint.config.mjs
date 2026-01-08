import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      'dist',
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'src/components/ui/**', // shadcn/ui 元件，不需要檢查
      '*.config.js',
      '*.config.mjs'
    ]
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '19.1', jsxRuntime: 'automatic' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off', // 關閉 prop-types 檢查，因為專案沒有使用 PropTypes
      'react-refresh/only-export-components': [
        'warn',
        // 允許 Next.js App Router 的特殊導出，避免 Fast Refresh warning
        { allowConstantExport: true, allowExportNames: ['metadata', 'generateMetadata'] },
      ],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-console': 'error',
    },
  },
  // TypeScript 檔案設定
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '19.1', jsxRuntime: 'automatic' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off', // 使用 TypeScript 版本
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      '@typescript-eslint/no-explicit-any': 'error', // 禁止使用 any
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        // 允許 Next.js App Router 的特殊導出，避免 Fast Refresh warning
        { allowConstantExport: true, allowExportNames: ['metadata', 'generateMetadata'] },
      ],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'no-console': 'error',
    },
  },
]
