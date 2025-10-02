module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    {{#if module.parameters.typescript}}
    '@typescript-eslint/recommended',
    {{/if}}
    {{#if module.parameters.react}}
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    {{/if}}
    {{#if module.parameters.nextjs}}
    'next/core-web-vitals',
    {{/if}}
    {{#if module.parameters.nodejs}}
    'plugin:node/recommended',
    {{/if}}
    {{#if module.parameters.accessibility}}
    'plugin:jsx-a11y/recommended',
    {{/if}}
    {{#if module.parameters.imports}}
    'plugin:import/recommended',
    'plugin:import/typescript',
    {{/if}}
    {{#if module.parameters.format}}
    'plugin:prettier/recommended',
    {{/if}}
  ],
  parser: {{#if module.parameters.typescript}}'@typescript-eslint/parser'{{else}}'@babel/eslint-parser'{{/if}},
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    {{#if module.parameters.typescript}}
    project: './tsconfig.json',
    {{/if}}
  },
  plugins: [
    {{#if module.parameters.typescript}}
    '@typescript-eslint',
    {{/if}}
    {{#if module.parameters.react}}
    'react',
    'react-hooks',
    {{/if}}
    {{#if module.parameters.nodejs}}
    'node',
    {{/if}}
    {{#if module.parameters.accessibility}}
    'jsx-a11y',
    {{/if}}
    {{#if module.parameters.imports}}
    'import',
    {{/if}}
    {{#if module.parameters.format}}
    'prettier',
    {{/if}}
  ],
  settings: {
    {{#if module.parameters.react}}
    react: {
      version: 'detect',
    },
    {{/if}}
    {{#if module.parameters.imports}}
    'import/resolver': {
      {{#if module.parameters.typescript}}
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      {{else}}
      node: {
        extensions: ['.js', '.jsx'],
      },
      {{/if}}
    },
    {{/if}}
  },
  rules: {
    // Base rules
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-unused-vars': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    
    {{#if module.parameters.typescript}}
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    {{/if}}
    
    {{#if module.parameters.react}}
    // React rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    {{/if}}
    
    {{#if module.parameters.imports}}
    // Import rules
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-useless-path-segments': 'error',
    {{/if}}
    
    {{#if module.parameters.strict}}
    // Strict rules
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unused-expressions': 'error',
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    {{/if}}
    
    {{#if module.parameters.format}}
    // Prettier rules
    'prettier/prettier': 'error',
    {{/if}}
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        {{#if module.parameters.typescript}}
        '@typescript-eslint/no-var-requires': 'off',
        {{/if}}
      },
    },
    {
      files: ['*.test.js', '*.test.jsx', '*.test.ts', '*.test.tsx'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
