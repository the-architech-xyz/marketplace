/**
 * Architech Welcome Feature Blueprint
 * 
 * Creates a beautiful welcome page that showcases the generated project's
 * capabilities, technology stack, and provides quick start guidance.
 */

import { Blueprint, BlueprintActionType, ModifierType, EnhanceFileFallbackStrategy, ConflictResolutionStrategy } from '@thearchitech.xyz/marketplace/types';

export const architechWelcomeBlueprint: Blueprint = {
  id: 'architech-welcome-setup',
  name: 'Architech Welcome Page',
  description: 'Beautiful welcome page showcasing project capabilities and technology stack',
  actions: [
    // Install additional dependencies for the welcome page
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: [
        'lucide-react@^0.294.0',
        'framer-motion@^10.16.0',
        'react-syntax-highlighter@^15.5.0',
        '@types/react-syntax-highlighter@^15.5.0'
      ]
    },

    // Create the main welcome page
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.app_root}}page.tsx',
      template: 'templates/welcome-page.tsx.tpl',
      overwrite: true,
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create welcome page layout
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}welcome/welcome-layout.tsx',
      template: 'templates/welcome-layout.tsx.tpl',
    
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }},

    // Create technology stack visualizer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}welcome/tech-stack-card.tsx',
      template: 'templates/tech-stack-card.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create component showcase
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}welcome/component-showcase.tsx',
      template: 'templates/component-showcase.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create project structure viewer
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}welcome/project-structure.tsx',
      template: 'templates/project-structure.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    },

    // Create quick start guide
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.components}}welcome/quick-start-guide.tsx',
      template: 'templates/quick-start-guide.tsx.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE, 
        priority: 2
      }
    },

    // Create project analyzer utility
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.shared_library}}project-analyzer.ts',
      content: `/**
 * Project Analyzer
 * 
 * Analyzes the generated project to extract technology stack and capabilities
 */

export interface ProjectCapability {
  id: string;
  name: string;
  description: string;
  category: 'framework' | 'ui' | 'database' | 'auth' | 'deployment' | 'testing' | 'other';
  version?: string;
  icon?: string;
  color?: string;

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }}

export interface ProjectStructure {
  name: string;
  type: 'file' | 'directory';
  children?: ProjectStructure[];
  description?: string;
  size?: string;
}

export class ProjectAnalyzer {
  /**
   * Analyze the project and extract capabilities from modules
   */
  static analyzeProject(modules: any[]): ProjectCapability[] {
    const capabilities: ProjectCapability[] = [];

    for (const module of modules) {
      const capability = this.mapModuleToCapability(module);
      if (capability) {
        capabilities.push(capability);
      }
    }

    return capabilities;
  }

  /**
   * Map module to capability
   */
  private static mapModuleToCapability(module: any): ProjectCapability | null {
    const moduleMap: Record<string, Partial<ProjectCapability>> = {
      'framework/nextjs': {
        id: 'nextjs',
        name: 'Next.js',
        description: 'React framework for production',
        category: 'framework',
        icon: 'NextJS',
        color: 'black'
      },
      'ui/shadcn-ui': {
        id: 'shadcn-ui',
        name: 'Shadcn/UI',
        description: 'Beautifully designed components',
        category: 'ui',
        icon: 'Component',
        color: 'blue'
      },
      'ui/tailwind': {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        category: 'ui',
        icon: 'Palette',
        color: 'cyan'
      },
      'database/drizzle': {
        id: 'drizzle',
        name: 'Drizzle ORM',
        description: 'TypeScript ORM for SQL databases',
        category: 'database',
        icon: 'Database',
        color: 'green'
      },
      'database/prisma': {
        id: 'prisma',
        name: 'Prisma',
        description: 'Next-generation ORM',
        category: 'database',
        icon: 'Database',
        color: 'purple'
      },
      'auth/better-auth': {
        id: 'better-auth',
        name: 'Better Auth',
        description: 'Modern authentication solution',
        category: 'auth',
        icon: 'Shield',
        color: 'red'
      },
      'state/zustand': {
        id: 'zustand',
        name: 'Zustand',
        description: 'Small, fast state management',
        category: 'other',
        icon: 'Package',
        color: 'orange'
      },
      'data-fetching/tanstack-query': {
        id: 'tanstack-query',
        name: 'TanStack Query',
        description: 'Data fetching and caching',
        category: 'other',
        icon: 'RefreshCw',
        color: 'blue'
      }
    };

    const mapping = moduleMap[module.id];
    if (!mapping) return null;

    return {
      id: mapping.id || module.id,
      name: mapping.name || module.name || module.id,
      description: mapping.description || 'Project capability',
      category: mapping.category || 'other',
      version: module.version,
      icon: mapping.icon,
      color: mapping.color
    };
  }

  /**
   * Generate project structure tree
   */
  static generateProjectStructure(): ProjectStructure {
    return {
      name: 'src',
      type: 'directory',
      children: [
        {
          name: 'app',
          type: 'directory',
          description: 'Next.js App Router pages',
          children: [
            { name: 'page.tsx', type: 'file', description: 'Home page' },
            { name: 'layout.tsx', type: 'file', description: 'Root layout' },
            { name: 'globals.css', type: 'file', description: 'Global styles' }
          ]
        },
        {
          name: 'components',
          type: 'directory',
          description: 'React components',
          children: [
            { name: 'ui', type: 'directory', description: 'Shadcn/UI components' },
            { name: 'welcome', type: 'directory', description: 'Welcome page components' }
          ]
        },
        {
          name: 'lib',
          type: 'directory',
          description: 'Utility functions and configurations',
          children: [
            { name: 'utils.ts', type: 'file', description: 'Utility functions' },
            { name: 'project-analyzer.ts', type: 'file', description: 'Project analysis' }
          ]
        }
      ]
    };
  }
}`
    },

    // Create welcome page styles
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.styles}}welcome.css',
      content: `/* Architech Welcome Page Styles */

.welcome-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }}

.tech-card {
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.component-showcase {
  background: linear-gradient(45deg, #f0f9ff 0%, #e0f2fe 100%);
}

.project-structure-tree {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.quick-start-step {
  transition: all 0.2s ease;
}

.quick-start-step:hover {
  background-color: rgba(59, 130, 246, 0.05);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-delay-100 {
  animation-delay: 0.1s;
}

.animate-delay-200 {
  animation-delay: 0.2s;
}

.animate-delay-300 {
  animation-delay: 0.3s;
}`
    },

    // Update globals.css to include welcome styles
    {
      type: BlueprintActionType.ENHANCE_FILE,
      path: '{{paths.app_root}}globals.css',
      modifier: ModifierType.CSS_ENHANCER,
      fallback: EnhanceFileFallbackStrategy.CREATE,
      params: {
        content: `@import "../styles/welcome.css";`
      }
    },

    // Create README with project information
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.readme}}',
      template: 'templates/README.md.tpl',
      conflictResolution: {
        strategy: ConflictResolutionStrategy.REPLACE,
        priority: 2
      }
    }
  ]
};
