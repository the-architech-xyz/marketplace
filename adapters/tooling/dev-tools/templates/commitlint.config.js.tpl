{
  "extends": ["@commitlint/config-conventional"]
}`,
      condition: '{{#if module.parameters.commitlint}}'
    },
    // Create ESLint configuration
    {
