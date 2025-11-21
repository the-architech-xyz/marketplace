# Contributing to The Architech Marketplace

Thank you for your interest in contributing to The Architech Marketplace! This document provides guidelines and instructions for contributing to the marketplace.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Git

### Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/marketplace.git
   cd marketplace
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Git Hooks**
   ```bash
   npm run prepare
   ```

## 📝 Development Workflow

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Add/modify adapters in `adapters/`
   - Add/modify integrations in `integrations/`
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   # Generate types to ensure your changes are valid
   npm run types:generate
   
   # Check for type errors
   npx tsc --noEmit
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new adapter for X"
   ```

   The pre-commit hook will automatically:
   - Generate updated TypeScript types
   - Add generated files to the commit
   - Ensure types are always in sync

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🏗️ Adding New Adapters

### 1. Create Adapter Directory

```bash
mkdir -p adapters/category/adapter-name
```

### 2. Create `adapter.json`

```json
{
  "id": "adapter-name",
  "name": "My Adapter",
  "description": "Description of my adapter",
  "category": "category",
  "version": "1.0.0",
  "blueprint": "blueprint.ts",
  "parameters": {
    "myParam": {
      "type": "string",
      "description": "My parameter description",
      "required": false,
      "default": "default-value"
    }
  },
  "features": {
    "myFeature": {
      "id": "myFeature",
      "name": "My Feature",
      "description": "My feature description"
    }
  }
}
```

### 3. Create `blueprint.ts`

```typescript
import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const blueprint: Blueprint = {
  id: 'adapter-name-blueprint',
  name: 'My Adapter Blueprint',
  description: 'Blueprint for my adapter',
  actions: [
    {
      type: BlueprintActionType.INSTALL_PACKAGES,
      packages: ['my-package@^1.0.0']
    },
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.src}}/lib/my-adapter.ts',
      content: '// My adapter implementation'
    }
  ]
};

export default blueprint;
```

### 4. Add Templates (Optional)

Create template files in `adapters/category/adapter-name/templates/`:

```typescript
// templates/my-template.ts.tpl
export const {{adapterName}} = {
  // Template content with {{variables}}
};
```

## 🔗 Adding New Integrations

### 1. Create Integration Directory

```bash
mkdir -p integrations/integration-name
```

### 2. Create `integration.json`

```json
{
  "id": "integration-name",
  "name": "My Integration",
  "description": "Integration between X and Y",
  "version": "1.0.0",
  "blueprint": "blueprint.ts",
  "parameters": {
    "enabled": {
      "type": "boolean",
      "description": "Whether to enable this integration",
      "required": false,
      "default": true
    }
  }
}
```

### 3. Create `blueprint.ts`

```typescript
import { Blueprint, BlueprintActionType } from '@thearchitech.xyz/types';

const blueprint: Blueprint = {
  id: 'integration-name-blueprint',
  name: 'My Integration Blueprint',
  description: 'Blueprint for my integration',
  actions: [
    {
      type: BlueprintActionType.CREATE_FILE,
      path: '{{paths.src}}/lib/integrations/my-integration.ts',
      content: '// Integration implementation'
    }
  ]
};

export default blueprint;
```

## 📋 Schema Guidelines

### Parameter Types

- **`string`** - Text input
- **`boolean`** - True/false toggle
- **`number`** - Numeric input
- **`array`** - List of items
- **`object`** - Nested configuration
- **`select`** - Choose from predefined options

### Example Schema

```json
{
  "parameters": {
    "name": {
      "type": "string",
      "description": "Display name for the component",
      "required": true
    },
    "enabled": {
      "type": "boolean",
      "description": "Whether the feature is enabled",
      "required": false,
      "default": true
    },
    "components": {
      "type": "array",
      "description": "List of components to install",
      "required": false,
      "default": ["button", "input", "card"],
      "items": {
        "type": "string",
        "enum": ["button", "input", "card", "dialog", "form"]
      }
    },
    "mode": {
      "type": "select",
      "description": "Operation mode",
      "required": false,
      "default": "development",
      "choices": ["development", "staging", "production"]
    }
  }
}
```

## 🧪 Testing

### Type Generation Test

```bash
# Generate types
npm run types:generate

# Check for errors
npx tsc --noEmit
```

### Manual Testing

1. Create a test genome using your adapter
2. Run the CLI with your genome
3. Verify the generated project works correctly

## 📚 Documentation

### Required Documentation

- **README.md** - Main documentation
- **CONTRIBUTING.md** - This file
- **DEVELOPMENT.md** - Development workflow
- **API.md** - API reference (if applicable)

### Documentation Standards

- Use clear, concise language
- Include code examples
- Update documentation when adding features
- Use proper markdown formatting

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Ensure you're using the latest version
3. Try to reproduce the issue

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 18.0.0]
- Marketplace version: [e.g. 1.1.0]

**Additional Context**
Any other relevant information.
```

## 💡 Feature Requests

### Before Requesting

1. Check existing feature requests
2. Consider if it fits the project scope
3. Think about implementation complexity

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature.

**Use Case**
Why would this feature be useful?

**Proposed Solution**
How would you like this to work?

**Alternatives**
Any alternative solutions you've considered.

**Additional Context**
Any other relevant information.
```

## 🔄 Pull Request Process

### Before Submitting

1. **Run Tests**
   ```bash
   npm run types:generate
   npx tsc --noEmit
   ```

2. **Update Documentation**
   - Update README.md if needed
   - Add/update API documentation
   - Update examples

3. **Check Commit Messages**
   - Use conventional commit format
   - Be descriptive and clear

### PR Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Types generate successfully
- [ ] No TypeScript errors
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 📞 Getting Help

- **Discord**: [The Architech Community](https://discord.gg/thearchitech)
- **GitHub Issues**: [Create an issue](https://github.com/the-architech-xyz/marketplace/issues)
- **Email**: [support@thearchitech.dev](mailto:support@thearchitech.dev)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to The Architech Marketplace! 🚀**
