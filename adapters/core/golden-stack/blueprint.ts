/**
 * Golden Stack Adapter Blueprint
 * 
 * Bundles essential technologies for production-ready Architech applications:
 * - Zustand: State management
 * - Vitest: Testing framework
 * - ESLint: Code linting
 * - Prettier: Code formatting
 * - Zod: Schema validation
 */

import { BlueprintAction, BlueprintActionType, ConflictResolutionStrategy } from '@thearchitech.xyz/types';
import { TypedMergedConfiguration, extractTypedModuleParameters } from '../../../types/blueprint-config-types.js';

export default function generateBlueprint(
  config: TypedMergedConfiguration<'core/golden-stack'>
): BlueprintAction[] {
  const { params } = extractTypedModuleParameters(config);
  const actions: BlueprintAction[] = [];

  // 1. Zustand (State Management) - ALWAYS
  actions.push(...generateZustandActions(params.zustand));

  // 2. Vitest (Testing) - ALWAYS
  actions.push(...generateVitestActions(params.vitest));

  // 3. ESLint (Linting) - ALWAYS
  actions.push(...generateESLintActions(params.eslint));

  // 4. Prettier (Formatting) - ALWAYS
  actions.push(...generatePrettierActions(params.prettier));

  // 5. Zod (Validation) - ALWAYS
  actions.push(...generateZodActions());

  return actions;
}

// ============================================================================
// 1. ZUSTAND - STATE MANAGEMENT
// ============================================================================

function generateZustandActions(zustandParams: any): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install Zustand
  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages: ['zustand']
  });

  if (zustandParams?.immer) {
    actions.push({
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['immer']
    });
  }

  // Core store files
  actions.push(
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.stores}/create-store.ts',
      template: 'templates/zustand/create-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.stores}/index.ts',
      template: 'templates/zustand/index.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.stores}/store-types.ts',
      template: 'templates/zustand/store-types.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.stores}/use-store.ts',
      template: 'templates/zustand/use-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.providers}/StoreProvider.tsx',
      template: 'templates/zustand/StoreProvider.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.stores}/use-app-store.ts',
      template: 'templates/zustand/use-app-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.stores}/use-ui-store.ts',
      template: 'templates/zustand/use-ui-store.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    }
  );

  // Conditional: Persistence
  if (zustandParams?.persistence) {
    actions.push({
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.stores}/middleware/persistence.ts',
      template: 'templates/zustand/persistence.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.SKIP,
        priority: 0
      }
    });
  }

  // Conditional: Middleware
  actions.push({
    type: BlueprintActionType.CREATE_FILE,
    path: '${paths.stores}/middleware.ts',
    template: 'templates/zustand/middleware.ts.tpl',
    conflictResolution: {
      strategy: ConflictResolutionStrategy.SKIP,
      priority: 0
    }
  });

  return actions;
}

// ============================================================================
// 2. VITEST - TESTING
// ============================================================================

function generateVitestActions(vitestParams: any): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install Vitest and testing libraries
  const packages = [
    'vitest',
    '@vitejs/plugin-react',
    'jsdom',
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
    '@types/react',
    '@types/react-dom'
  ];

  if (vitestParams?.coverage) {
    packages.push('@vitest/coverage-v8');
  }

  if (vitestParams?.ui) {
    packages.push('@vitest/ui');
  }

  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages,
    isDev: true
  });

  // Core config
  actions.push(
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'vitest.config.ts',
      template: 'templates/vitest/vitest.config.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tests/setup/setup.ts',
      template: 'templates/vitest/setup.ts.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tests/setup/utils.tsx',
      template: 'templates/vitest/utils.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'tests/unit/example.test.tsx',
      template: 'templates/vitest/example.test.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    }
  );

  // Scripts
  actions.push(
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test',
      command: 'vitest'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:run',
      command: 'vitest run'
    }
  );

  if (vitestParams?.coverage) {
    actions.push({
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:coverage',
      command: 'vitest run --coverage'
    });
  }

  if (vitestParams?.ui) {
    actions.push({
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'test:ui',
      command: 'vitest --ui'
    });
  }

  return actions;
}

// ============================================================================
// 3. ESLINT - CODE LINTING
// ============================================================================

function generateESLintActions(eslintParams: any): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install ESLint
  const packages = ['eslint', '@eslint/eslintrc'];

  if (eslintParams?.typescript) {
    packages.push('@typescript-eslint/parser', '@typescript-eslint/eslint-plugin');
  }

  if (eslintParams?.react) {
    packages.push('eslint-plugin-react', 'eslint-plugin-react-hooks');
  }

  if (eslintParams?.nextjs) {
    packages.push('eslint-config-next');
  }

  if (eslintParams?.accessibility) {
    packages.push('eslint-plugin-jsx-a11y');
  }

  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages,
    isDev: true
  });

  // Config files
  actions.push(
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'eslint.config.mjs',
      template: 'templates/eslint/eslint.config.mjs.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.eslintignore',
      content: `node_modules
.next
dist
build
coverage
.turbo
*.config.js
*.config.ts
`,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'eslint-rules.js',
      template: 'templates/eslint/eslint-rules.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.scripts}/lint-staged.js',
      template: 'templates/eslint/lint-staged.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.scripts}/eslint-fix.js',
      template: 'templates/eslint/eslint-fix.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    }
  );

  // Scripts
  actions.push(
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'lint',
      command: 'eslint . --ext .js,.jsx,.ts,.tsx'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'lint:fix',
      command: 'eslint . --ext .js,.jsx,.ts,.tsx --fix'
    }
  );

  return actions;
}

// ============================================================================
// 4. PRETTIER - CODE FORMATTING
// ============================================================================

function generatePrettierActions(prettierParams: any): BlueprintAction[] {
  const actions: BlueprintAction[] = [];

  // Install Prettier
  const packages = ['prettier'];

  if (prettierParams?.tailwind) {
    packages.push('prettier-plugin-tailwindcss');
  }

  actions.push({
    type: BlueprintActionType.INSTALL_PACKAGES,
    packages,
    isDev: true
  });

  // Config files
  actions.push(
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.prettierrc',
      content: `{
  "semi": ${prettierParams?.semi ?? true},
  "singleQuote": ${prettierParams?.singleQuote ?? true},
  "tabWidth": ${prettierParams?.tabWidth ?? 2},
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"${prettierParams?.tailwind ? ',\n  "plugins": ["prettier-plugin-tailwindcss"]' : ''}
}`,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '.prettierignore',
      content: `node_modules
.next
dist
build
coverage
.turbo
pnpm-lock.yaml
package-lock.json
yarn.lock
`,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: 'prettier.config.js',
      template: 'templates/prettier/prettier.config.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.scripts}/format-all.js',
      template: 'templates/prettier/format-all.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '${paths.scripts}/format-staged.js',
      template: 'templates/prettier/format-staged.js.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 0
      }
    }
  );

  // Scripts
  actions.push(
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'format',
      command: 'prettier --write .'
    },
    {
      type: BlueprintActionType.ADD_SCRIPT,
      name: 'format:check',
      command: 'prettier --check .'
    }
  );

  return actions;
}

// ============================================================================
// 5. ZOD - VALIDATION
// ============================================================================

function generateZodActions(): BlueprintAction[] {
  return [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['zod']
    }
    // Zod is used by features directly, no setup files needed
  ];
}

