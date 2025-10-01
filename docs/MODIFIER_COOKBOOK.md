# Modifier Cookbook

> The definitive guide to The Architech's surgical modification tools

The Architech's **Pure Modifiers** are sophisticated tools that perform precise, surgical modifications to existing files. They are the heart of our integration system, allowing modules to enhance existing code without replacing entire files.

## Table of Contents

- [js-config-merger](#js-config-merger) - JavaScript/TypeScript configuration merging
- [ts-module-enhancer](#ts-module-enhancer) - TypeScript module enhancement
- [json-merger](#json-merger) - JSON file deep merging
- [jsx-children-wrapper](#jsx-children-wrapper) - JSX children wrapping
- [Best Practices](#best-practices)

---

## js-config-merger

**Purpose:** Intelligently deep-merges properties into JavaScript/TypeScript configuration objects using AST-based merging.

### Blueprint API

```typescript
{
  type: 'ENHANCE_FILE',
  file: 'path/to/config.js',
  modifier: 'js-config-merger',
  params: {
    content: string,                    // New config content to merge
    exportName?: 'default' | 'module.exports' | 'named',  // Export type
    namedExport?: string,               // Name for named exports
    mergeStrategy?: 'merge' | 'replace' | 'append',  // Array/object strategy
    targetProperties?: object,          // Direct properties to merge
    preserveComments?: boolean          // Preserve existing comments
  }
}
```

### Before/After Example

**Before (`tailwind.config.js`):**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Blueprint Action:**
```typescript
{
  type: 'ENHANCE_FILE',
  file: 'tailwind.config.js',
  modifier: 'js-config-merger',
  params: {
    content: `
      module.exports = {
        theme: {
          extend: {
            colors: {
              primary: '#3b82f6',
              secondary: '#64748b'
            }
          }
        },
        plugins: [
          require('@tailwindcss/forms'),
          require('@tailwindcss/typography')
        ]
      }
    `,
    exportName: 'module.exports',
    mergeStrategy: 'merge'
  }
}
```

**After (`tailwind.config.js`):**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
```

---

## ts-module-enhancer

**Purpose:** Enhances TypeScript modules by adding imports and top-level statements.

### Blueprint API

```typescript
{
  type: 'ENHANCE_FILE',
  file: 'path/to/file.ts',
  modifier: 'ts-module-enhancer',
  params: {
    importsToAdd?: Array<{
      name: string,                     // Import name
      from: string,                     // Module path
      type?: 'import' | 'type',         // Import type
      isDefault?: boolean,              // Default import
      isNamespace?: boolean             // Namespace import
    }>,
    statementsToAppend?: Array<{
      type: 'raw' | 'function' | 'const' | 'interface' | 'type',
      content: string                   // Statement content
    }>,
    preserveExisting?: boolean          // Preserve existing code
  }
}
```

### Before/After Example

**Before (`src/lib/auth.ts`):**
```typescript
export function getUser() {
  return { id: 1, name: 'John' };
}
```

**Blueprint Action:**
```typescript
{
  type: 'ENHANCE_FILE',
  file: 'src/lib/auth.ts',
  modifier: 'ts-module-enhancer',
  params: {
    importsToAdd: [
      { name: 'jwt', from: 'jsonwebtoken' },
      { name: 'bcrypt', from: 'bcryptjs' },
      { name: 'User', from: './types', type: 'type' }
    ],
    statementsToAppend: [
      {
        type: 'function',
        content: `export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}`
      },
      {
        type: 'function',
        content: `export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as User;
  } catch {
    return null;
  }
}`
      }
    ]
  }
}
```

**After (`src/lib/auth.ts`):**
```typescript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { User } from './types';

export function getUser() {
  return { id: 1, name: 'John' };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as User;
  } catch {
    return null;
  }
}
```

---

## json-merger

**Purpose:** Performs deep merge on JSON files (package.json, tsconfig.json, etc.).

### Blueprint API

```typescript
{
  type: 'ENHANCE_FILE',
  file: 'path/to/file.json',
  modifier: 'json-merger',
  params: {
    merge: object,                      // Object to merge
    strategy?: 'deep' | 'shallow',     // Merge strategy
    arrayMergeStrategy?: 'concat' | 'replace' | 'unique'  // Array strategy
  }
}
```

### Before/After Example

**Before (`package.json`):**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0"
  }
}
```

**Blueprint Action:**
```typescript
{
  type: 'ENHANCE_FILE',
  file: 'package.json',
  modifier: 'json-merger',
  params: {
    merge: {
      scripts: {
        "test": "jest",
        "lint": "eslint .",
        "type-check": "tsc --noEmit"
      },
      dependencies: {
        "typescript": "^5.0.0",
        "@types/react": "^18.0.0"
      },
      devDependencies: {
        "jest": "^29.0.0",
        "eslint": "^8.0.0"
      }
    },
    strategy: 'deep',
    arrayMergeStrategy: 'concat'
  }
}
```

**After (`package.json`):**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "jest",
    "lint": "eslint .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  }
}
```

---

## jsx-children-wrapper

**Purpose:** Wraps {children} in JSX components with provider components.

### Blueprint API

```typescript
{
  type: 'ENHANCE_FILE',
  file: 'path/to/layout.tsx',
  modifier: 'jsx-children-wrapper',
  params: {
    providers: Array<{
      component: string,                // Component name
      import: {
        name: string,                   // Import name
        from: string,                   // Module path
        isDefault?: boolean             // Default import
      },
      props?: object                    // Component props
    }>,
    targetElement?: string              // Target element (default: 'body')
  }
}
```

### Before/After Example

**Before (`src/app/layout.tsx`):**
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

**Blueprint Action:**
```typescript
{
  type: 'ENHANCE_FILE',
  file: 'src/app/layout.tsx',
  modifier: 'jsx-children-wrapper',
  params: {
    providers: [
      {
        component: 'ThemeProvider',
        import: {
          name: 'ThemeProvider',
          from: 'next-themes'
        },
        props: {
          attribute: 'class',
          defaultTheme: 'system',
          enableSystem: true
        }
      },
      {
        component: 'AuthProvider',
        import: {
          name: 'AuthProvider',
          from: './providers/auth-provider'
        }
      }
    ],
    targetElement: 'body'
  }
}
```

**After (`src/app/layout.tsx`):**
```tsx
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from './providers/auth-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## Best Practices

### 1. Choose the Right Modifier

- **js-config-merger**: For JavaScript/TypeScript config files (webpack, tailwind, etc.)
- **ts-module-enhancer**: For adding imports and functions to TypeScript files
- **json-merger**: For package.json, tsconfig.json, and other JSON configs
- **jsx-children-wrapper**: For wrapping React/Next.js layouts with providers

### 2. Preserve Existing Code

Always set `preserveExisting: true` (default) to avoid overwriting user customizations.

### 3. Use Appropriate Merge Strategies

- **deep**: For nested objects (recommended for most cases)
- **shallow**: For simple property replacement
- **concat**: For arrays where you want to add items
- **unique**: For arrays where duplicates should be removed

### 4. Test Your Modifications

Always test your blueprint actions with real files to ensure they work as expected.

### 5. Handle Edge Cases

Consider what happens when:
- The target file doesn't exist
- The file has unexpected structure
- Required imports are already present
- The target element isn't found

---

*This cookbook covers the core modifiers available in The Architech. For advanced usage and custom modifiers, refer to the [Authoring Guide](./AUTHORING_GUIDE.md).*
