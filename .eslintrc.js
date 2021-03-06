module.exports = {
  root: true,
  env: {
    node: false,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    // '@vue/prettier',
    '@vue/typescript',
    'prettier',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'always-multiline'],
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     'comma-dangle': ['error', 'always-multiline'],
    //   },
    // ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
