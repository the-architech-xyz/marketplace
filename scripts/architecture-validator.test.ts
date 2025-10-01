/**
 * Unit Tests for SmartArchitectureValidator
 */

import { SmartArchitectureValidator, Module, Genome } from './smart-architecture-validator.js';
import { ModuleArtifacts } from '@thearchitech.xyz/types';

// Mock the ModuleArtifacts registry
const mockModuleArtifacts = {
  'database/drizzle': () => Promise.resolve({
    creates: [
      { path: 'src/lib/db/index.ts', required: true },
      { path: 'src/lib/db/schema.ts', required: true },
      { path: 'drizzle.config.ts', required: true }
    ],
    enhances: [],
    installs: [],
    envVars: []
  } as ModuleArtifacts),
  
  'auth/better-auth': () => Promise.resolve({
    creates: [
      { path: 'src/lib/auth/config.ts', required: true },
      { path: 'src/lib/auth/client.ts', required: true }
    ],
    enhances: [],
    installs: [],
    envVars: []
  } as ModuleArtifacts),
  
  'ui/shadcn-ui': () => Promise.resolve({
    creates: [
      { path: 'src/components/ui/button.tsx', required: true },
      { path: 'src/components/ui/input.tsx', required: true }
    ],
    enhances: [],
    installs: [],
    envVars: []
  } as ModuleArtifacts),
  
  'drizzle-nextjs-integration': () => Promise.resolve({
    creates: [
      { path: 'src/app/api/db/migrate/route.ts', required: true },
      { path: 'src/app/api/db/seed/route.ts', required: true }
    ],
    enhances: [
      { path: 'src/lib/db/index.ts', required: true, owner: 'database/drizzle' }
    ],
    installs: [],
    envVars: []
  } as ModuleArtifacts),
  
  'better-auth-nextjs-integration': () => Promise.resolve({
    creates: [
      { path: 'src/app/api/auth/[...all]/route.ts', required: true },
      { path: 'src/middleware.ts', required: true }
    ],
    enhances: [
      { path: 'src/lib/auth/config.ts', required: true, owner: 'auth/better-auth' }
    ],
    installs: [],
    envVars: []
  } as ModuleArtifacts),
  
  'invalid-integration': () => Promise.resolve({
    creates: [],
    enhances: [
      { path: 'src/lib/db/index.ts', required: true, owner: 'database/drizzle' }
    ],
    installs: [],
    envVars: []
  } as ModuleArtifacts),
  
  'conflicting-adapter-1': () => Promise.resolve({
    creates: [
      { path: 'src/lib/conflict.ts', required: true }
    ],
    enhances: [],
    installs: [],
    envVars: []
  } as ModuleArtifacts),
  
  'conflicting-adapter-2': () => Promise.resolve({
    creates: [
      { path: 'src/lib/conflict.ts', required: true }
    ],
    enhances: [],
    installs: [],
    envVars: []
  } as ModuleArtifacts)
};

// Mock the ModuleArtifacts import
jest.mock('@thearchitech.xyz/types', () => ({
  ...jest.requireActual('@thearchitech.xyz/types'),
  ModuleArtifacts: mockModuleArtifacts
}));

describe('SmartArchitectureValidator', () => {
  let validator: SmartArchitectureValidator;

  beforeEach(() => {
    validator = new SmartArchitectureValidator();
  });

  afterEach(() => {
    validator.clearCache();
  });

  describe('validateFileOwnership', () => {
    it('should pass validation for a valid genome', async () => {
      const validGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'database/drizzle',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'drizzle-nextjs-integration',
            type: 'integration',
            dependencies: ['database/drizzle']
          }
        ]
      };

      const result = await validator.validateFileOwnership(validGenome);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for integrator enhancing file not owned by dependencies', async () => {
      const invalidGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'auth/better-auth',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'invalid-integration',
            type: 'integration',
            dependencies: ['auth/better-auth'] // Wrong dependency!
          }
        ]
      };

      const result = await validator.validateFileOwnership(invalidGenome);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('FILE_OWNERSHIP_VIOLATION');
      expect(result.errors[0].message).toContain('not a declared dependency');
    });

    it('should fail validation for integrator enhancing non-existent file', async () => {
      const invalidGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'invalid-integration',
            type: 'integration',
            dependencies: []
          }
        ]
      };

      const result = await validator.validateFileOwnership(invalidGenome);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('FILE_OWNERSHIP_VIOLATION');
      expect(result.errors[0].message).toContain('not created by any adapter');
    });
  });

  describe('detectCreateConflicts', () => {
    it('should pass validation when no conflicts exist', async () => {
      const validGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'database/drizzle',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'auth/better-auth',
            type: 'adapter',
            dependencies: []
          }
        ]
      };

      const result = await validator.detectCreateConflicts(validGenome);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect conflicts when multiple modules create the same file', async () => {
      const conflictingGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'conflicting-adapter-1',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'conflicting-adapter-2',
            type: 'adapter',
            dependencies: []
          }
        ]
      };

      const result = await validator.detectCreateConflicts(conflictingGenome);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('CREATE_CONFLICT');
      expect(result.errors[0].message).toContain('Multiple modules trying to create');
      expect(result.errors[0].details.conflictingModules).toContain('conflicting-adapter-1');
      expect(result.errors[0].details.conflictingModules).toContain('conflicting-adapter-2');
    });
  });

  describe('validateDependencies', () => {
    it('should pass validation when all dependencies exist', async () => {
      const validGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'database/drizzle',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'drizzle-nextjs-integration',
            type: 'integration',
            dependencies: ['database/drizzle']
          }
        ]
      };

      const result = await validator.validateDependencies(validGenome);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation when dependencies are missing', async () => {
      const invalidGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'drizzle-nextjs-integration',
            type: 'integration',
            dependencies: ['database/drizzle', 'missing-module']
          }
        ]
      };

      const result = await validator.validateDependencies(invalidGenome);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('MISSING_DEPENDENCY');
      expect(result.errors[0].message).toContain('missing-module');
    });
  });

  describe('validateGenome', () => {
    it('should pass validation for a complete valid genome', async () => {
      const validGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'database/drizzle',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'auth/better-auth',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'drizzle-nextjs-integration',
            type: 'integration',
            dependencies: ['database/drizzle']
          },
          {
            id: 'better-auth-nextjs-integration',
            type: 'integration',
            dependencies: ['auth/better-auth']
          }
        ]
      };

      const result = await validator.validateGenome(validGenome);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for genome with multiple issues', async () => {
      const invalidGenome: Genome = {
        project: { name: 'test-project', framework: 'nextjs' },
        modules: [
          {
            id: 'conflicting-adapter-1',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'conflicting-adapter-2',
            type: 'adapter',
            dependencies: []
          },
          {
            id: 'invalid-integration',
            type: 'integration',
            dependencies: ['auth/better-auth'] // Wrong dependency
          }
        ]
      };

      const result = await validator.validateGenome(invalidGenome);
      
      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      
      // Should have both create conflict and file ownership violation
      const errorTypes = result.errors.map(e => e.type);
      expect(errorTypes).toContain('CREATE_CONFLICT');
      expect(errorTypes).toContain('FILE_OWNERSHIP_VIOLATION');
    });
  });
});
