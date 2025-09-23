#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`,
      condition: '{{#if module.parameters.husky}}'
    },
    // Create lint-staged configuration
    {
