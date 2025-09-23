{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
}`,
      condition: '{{#if module.parameters.lintStaged}}'
    },
    // Create commitlint configuration
    {
