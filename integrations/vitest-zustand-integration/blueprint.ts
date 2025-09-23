import { Blueprint } from '@thearchitech.xyz/types';

const vitestZustandIntegrationBlueprint: Blueprint = {
  id: 'vitest-zustand-integration',
  name: 'Vitest Zustand Integration',
  description: 'Complete Vitest testing setup for Zustand state management',
  version: '1.0.0',
  actions: [
    {
      type: 'CREATE_FILE',
      path: 'vitest.config.zustand.ts',
      condition: '{{#if integration.features.storeTesting}}',
      template: 'integrations/vitest-zustand-integration/templates/vitest.config.zustand.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'vitest.setup.zustand.ts',
      condition: '{{#if integration.features.storeTesting}}',
      template: 'integrations/vitest-zustand-integration/templates/vitest.setup.zustand.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/store-test-utils.ts',
      condition: '{{#if integration.features.storeTesting}}',
      template: 'integrations/vitest-zustand-integration/templates/store-test-utils.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'test-utils/store-mock-utils.ts',
      condition: '{{#if integration.features.storeTesting}}',
      template: 'integrations/vitest-zustand-integration/templates/store-mock-utils.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/stores/store.test.ts',
      condition: '{{#if integration.features.storeTesting}}',
      template: 'integrations/vitest-zustand-integration/templates/store.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/stores/store-actions.test.ts',
      condition: '{{#if integration.features.storeTesting}}',
      template: 'integrations/vitest-zustand-integration/templates/store-actions.test.ts.tpl'
    },
    {
      type: 'CREATE_FILE',
      path: 'tests/stores/store-integration.test.ts',
      condition: '{{#if integration.features.storeTesting}}',
      template: 'integrations/vitest-zustand-integration/templates/store-integration.test.ts.tpl'
    }
  ]
};

export default vitestZustandIntegrationBlueprint;