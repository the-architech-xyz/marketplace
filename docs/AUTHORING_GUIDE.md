# Blueprint Authoring Guide

> A step-by-step tutorial for creating your first Adapter

Welcome to The Architech's contributor ecosystem! This guide will walk you through creating your first **Adapter** - a pure, framework-agnostic building block that adds specific functionality to projects.

## Table of Contents

- [Philosophy](#philosophy) - Understanding Adapters vs Integrators
- [Step 1: File Structure](#step-1-file-structure) - Setting up your adapter
- [Step 2: The Manifest](#step-2-the-manifest-adapterjson) - Defining your adapter
- [Step 3: The Blueprint](#step-3-the-blueprint-blueprintts) - Creating your blueprint
- [Step 4: The Template](#step-4-the-template) - Writing your template
- [Step 5: Advanced Enhancement](#step-5-advanced-enhancement) - Using modifiers
- [Best Practices](#best-practices) - Tips for success

---

## Philosophy

The Architech follows a clear separation of concerns:

- **Adapters** create isolated functionality (e.g., "install Drizzle ORM")
- **Integrators** connect adapters to frameworks (e.g., "make Drizzle work with Next.js")

This guide focuses on creating **Adapters** - the pure building blocks that can be used across any framework.

---

## Step 1: File Structure

Create the following directory structure for your adapter:

```
marketplace/adapters/your-category/your-adapter/
├── adapter.json          # Adapter manifest
├── blueprint.ts          # Blueprint definition
└── templates/            # Template files
    ├── config.ts.tpl
    └── index.ts.tpl
```

**Example:** Let's create a "logger" adapter for structured logging:

```
marketplace/adapters/tooling/logger/
├── adapter.json
├── blueprint.ts
└── templates/
    ├── logger.ts.tpl
    └── index.ts.tpl
```

---

## Step 2: The Manifest (`adapter.json`)

The `adapter.json` file defines your adapter's metadata, parameters, and capabilities.

```json
{
  "id": "logger",
  "name": "Structured Logger",
  "description": "A modern, structured logging solution with multiple transports",
  "category": "tooling",
  "version": "1.0.0",
  "blueprint": "blueprint.ts",
  "dependencies": [],
  "capabilities": [
    "structured-logging",
    "multiple-transports",
    "log-levels",
    "context-preservation",
    "performance-tracking"
  ],
  "limitations": "Requires Node.js 16+ for modern logging features",
  "parameters": {
    "level": {
      "type": "string",
      "default": "info",
      "description": "Default log level",
      "required": false,
      "options": ["error", "warn", "info", "debug", "trace"]
    },
    "transports": {
      "type": "array",
      "default": ["console"],
      "description": "Log transport types",
      "required": false,
      "options": ["console", "file", "json"]
    },
    "enablePerformance": {
      "type": "boolean",
      "default": true,
      "description": "Enable performance tracking",
      "required": false
    }
  }
}
```

### Key Properties Explained

- **`id`**: Unique identifier (used in genomes)
- **`name`**: Human-readable name
- **`description`**: What your adapter does
- **`category`**: One of: `framework`, `database`, `auth`, `ui`, `tooling`, `deployment`, `email`, `content`, `observability`, `state`, `blockchain`
- **`parameters`**: User-configurable options with types and validation

---

## Step 3: The Blueprint (`blueprint.ts`)

The blueprint defines what your adapter does when executed. It's a series of **Semantic Actions**.

```typescript
import { Blueprint } from '@thearchitech.xyz/types';

export const loggerBlueprint: Blueprint = {
  id: 'logger-setup',
  name: 'Logger Setup',
  description: 'Sets up structured logging with configurable transports',
  actions: [
    // 1. Install packages
    {
      type: 'INSTALL_PACKAGES',
      packages: ['winston', 'winston-daily-rotate-file']
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/winston'],
      isDev: true
    },
    
    // 2. Create configuration file
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/logger.ts',
      template: 'templates/logger.ts.tpl'
    },
    
    // 3. Create index file
    {
      type: 'CREATE_FILE',
      path: '{{paths.shared_library}}/index.ts',
      template: 'templates/index.ts.tpl'
    },
    
    // 4. Add environment variables
    {
      type: 'ADD_ENV_VAR',
      key: 'LOG_LEVEL',
      value: '{{module.parameters.level}}',
      description: 'Default log level'
    },
    
    // 5. Add npm script
    {
      type: 'ADD_SCRIPT',
      name: 'logs:view',
      command: 'tail -f logs/app.log'
    }
  ]
};
```

### Available Actions

- **`INSTALL_PACKAGES`**: Install npm packages
- **`CREATE_FILE`**: Create files from templates
- **`ADD_ENV_VAR`**: Add environment variables
- **`ADD_SCRIPT`**: Add npm scripts
- **`ENHANCE_FILE`**: Modify existing files (advanced)

### Template Variables

Use `{{variable}}` syntax for dynamic content:
- `{{module.parameters.level}}` - User parameters
- `{{paths.shared_library}}` - Framework paths
- `{{project.name}}` - Project information

---

## Step 4: The Template

Create template files that will be processed with your variables.

**`templates/logger.ts.tpl`:**
```typescript
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logLevel = process.env.LOG_LEVEL || '{{module.parameters.level}}';

// Create transports based on configuration
const transports: winston.transport[] = [];

{{#if module.parameters.transports.includes('console')}}
transports.push(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
);
{{/if}}

{{#if module.parameters.transports.includes('file')}}
transports.push(
  new DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d'
  })
);
{{/if}}

{{#if module.parameters.transports.includes('json')}}
transports.push(
  new winston.transports.File({
    filename: 'logs/error.json',
    level: 'error',
    format: winston.format.json()
  })
);
{{/if}}

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports
});

{{#if module.parameters.enablePerformance}}
// Performance tracking utilities
export const performanceLogger = {
  start: (operation: string) => {
    const start = Date.now();
    logger.info(`Starting ${operation}`, { operation, start });
    return start;
  },
  
  end: (operation: string, start: number) => {
    const duration = Date.now() - start;
    logger.info(`Completed ${operation}`, { operation, duration });
    return duration;
  }
};
{{/if}}
```

**`templates/index.ts.tpl`:**
```typescript
export { logger{{#if module.parameters.enablePerformance}}, performanceLogger{{/if}} } from './logger';

// Re-export common log levels for convenience
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace'
} as const;
```

---

## Step 5: Advanced Enhancement

For more sophisticated adapters, you can use **modifiers** to enhance existing files.

### Example: Adding a logger to package.json

```typescript
{
  type: 'ENHANCE_FILE',
  file: 'package.json',
  modifier: 'json-merger',
  params: {
    merge: {
      scripts: {
        "logs:clear": "rm -rf logs/*",
        "logs:tail": "tail -f logs/app.log"
      }
    }
  }
}
```

### Example: Adding imports to an existing TypeScript file

```typescript
{
  type: 'ENHANCE_FILE',
  file: 'src/app/layout.tsx',
  modifier: 'ts-module-enhancer',
  params: {
    importsToAdd: [
      { name: 'logger', from: '@/lib/logger' }
    ],
    statementsToAppend: [
      {
        type: 'raw',
        content: 'logger.info("Application started");'
      }
    ]
  }
}
```

---

## Best Practices

### 1. Keep Adapters Pure
- Don't assume a specific framework
- Use path variables (`{{paths.shared_library}}`)
- Make functionality framework-agnostic

### 2. Provide Sensible Defaults
- Set reasonable defaults for all parameters
- Make optional parameters truly optional
- Document what each parameter does

### 3. Use Conditional Templates
- Use `{{#if}}` blocks for optional features
- Provide multiple transport options
- Allow users to enable/disable features

### 4. Handle Edge Cases
- Check if files already exist
- Provide fallbacks for missing parameters
- Validate user input

### 5. Test Your Adapter
- Test with different parameter combinations
- Verify template rendering
- Check that all files are created correctly

### 6. Follow Naming Conventions
- Use kebab-case for adapter IDs
- Use descriptive names for capabilities
- Be consistent with existing adapters

---

## Example: Complete Logger Adapter

Here's the complete file structure for our logger adapter:

```
marketplace/adapters/tooling/logger/
├── adapter.json
├── blueprint.ts
└── templates/
    ├── logger.ts.tpl
    └── index.ts.tpl
```

**Usage in a genome:**
```typescript
import { defineGenome } from '@thearchitech.xyz/marketplace';

export default defineGenome({
  project: {
    name: 'my-app',
    framework: 'nextjs',
    // ...
  },
  modules: [
    {
      id: 'framework/nextjs',
      parameters: {}
    },
    {
      id: 'tooling/logger',
      parameters: {
        level: 'debug',
        transports: ['console', 'file'],
        enablePerformance: true
      }
    }
  ]
});
```

---

## Next Steps

1. **Test your adapter** with different parameter combinations
2. **Create integration modules** that connect your adapter to specific frameworks
3. **Contribute to the ecosystem** by sharing your adapter
4. **Read the [Modifier Cookbook](./MODIFIER_COOKBOOK.md)** for advanced techniques

---

*Congratulations! You've created your first adapter. You're now part of The Architech's contributor ecosystem. Happy coding! 🎉*
