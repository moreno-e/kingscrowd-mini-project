// @ts-nocheck
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt(
  // Ignore generated/build artifacts and tooling dirs
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.idea/**',
      '.vscode/**'
    ]
  },
  // Project-specific rule tweaks
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      // Allow console.warn/error, warn on other console usage
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',

      // Common Vue + Nuxt adjustments
      'vue/multi-word-component-names': 'off',

      // Helpful TS strictness without being too noisy
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      // Enforce Prettier formatting as ESLint errors
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
          vueIndentScriptAndStyle: true
        }
      ]
    }
  },
  // Disable ESLint rules that conflict with Prettier
  eslintConfigPrettier
)
