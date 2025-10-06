# 🚀 Contributor Quick Start

> **Get contributing to The Architech marketplace in 10 minutes**

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Your First Contribution](#your-first-contribution)
4. [Testing](#testing)
5. [Submitting Changes](#submitting-changes)

## 🔧 Prerequisites

Before contributing, ensure you have:

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Git** - For version control
- **TypeScript 5.0+** - For type safety
- **Basic understanding** of The Architech architecture

## 🚀 Setup

### 1. Clone and Build

```bash
# Clone the repository
git clone https://github.com/the-architech/cli.git
cd cli

# Install dependencies
npm install

# Build the project
npm run build

# Verify installation
node dist/index.js --version
```

### 2. Test the CLI

```bash
# Test with simple app genome
node dist/index.js new /path/to/marketplace/genomes/simple-app.genome.ts --dry-run

# Should show execution plan without errors
```

## 🎯 Your First Contribution

### Option 1: Fix Documentation

**Easiest way to start contributing**

1. **Find an issue**: Look for documentation bugs or improvements
2. **Make the fix**: Update the relevant documentation file
3. **Test locally**: Verify your changes work
4. **Submit PR**: Create a pull request with your changes

**Example**: Fix a typo in `CONTRIBUTING.md`

```bash
# Edit the file
vim marketplace/docs/CONTRIBUTING.md

# Test your changes
node dist/index.js --help

# Commit and push
git add marketplace/docs/CONTRIBUTING.md
git commit -m "fix: correct typo in contributing guide"
git push origin feature/fix-typo
```

### Option 2: Add a Simple Adapter

**Good for learning the architecture**

1. **Choose a technology**: Pick something simple like a utility library
2. **Create the adapter**: Follow the adapter guide
3. **Test it**: Create a test genome
4. **Submit PR**: Share your work

**Example**: Add a date utility adapter

```bash
# Create adapter directory
cd marketplace
mkdir -p adapters/utilities/date-utils
mkdir -p adapters/utilities/date-utils/templates

# Create adapter.json
cat > adapters/utilities/date-utils/adapter.json << 'EOF'
{
  "id": "utilities/date-utils",
  "name": "Date Utilities",
  "description": "Simple date utility functions",
  "version": "1.0.0",
  "category": "utilities",
  "parameters": {
    "timezone": {
      "type": "string",
      "default": "UTC",
      "description": "Default timezone for date operations"
    }
  }
}
EOF

# Create blueprint.ts
cat > adapters/utilities/date-utils/blueprint.ts << 'EOF'
import { Blueprint } from '@thearchitech.xyz/types';

const blueprint: Blueprint = {
  id: 'date-utils-blueprint',
  name: 'Date Utilities Blueprint',
  description: 'Blueprint for date utility functions',
  actions: [
    {
      type: 'INSTALL_PACKAGES',
      packages: ['date-fns@^2.30.0']
    },
    {
      type: 'CREATE_FILE',
      path: 'src/utils/date.ts',
      content: `import { format, parseISO } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'yyyy-MM-dd') => {
  return format(typeof date === 'string' ? parseISO(date) : date, formatStr);
};

export const getCurrentDate = () => {
  return new Date().toISOString();
};`
    }
  ]
};

export default blueprint;
EOF
```

### Option 3: Improve an Existing Adapter

**Good for understanding existing code**

1. **Pick an adapter**: Choose one you're familiar with
2. **Identify improvement**: Better parameters, more features, etc.
3. **Make the change**: Update the adapter
4. **Test thoroughly**: Ensure it still works
5. **Submit PR**: Share your improvement

**Example**: Improve the Next.js adapter

```bash
# Navigate to adapter
cd marketplace/adapters/framework/nextjs

# Edit adapter.json to add new parameter
vim adapter.json

# Test the change
cd ../../../
node dist/index.js new /path/to/marketplace/genomes/simple-app.genome.ts --dry-run
```

## 🧪 Testing

### Test Your Changes

```bash
# 1. Test with dry run first
node dist/index.js new test-genome.genome.ts --dry-run

# 2. If successful, test actual generation
node dist/index.js new test-genome.genome.ts

# 3. Verify generated project
cd test-app
npm install
npm run build
npm run dev
```

### Create Test Genome

```typescript
// test-genome.genome.ts
import { Genome } from '@thearchitech.xyz/marketplace';

const testGenome: Genome = {
  version: '1.0.0',
  project: {
    name: 'test-app',
    framework: 'nextjs',
    path: './test-app'
  },
  modules: [
    {
      id: 'framework/nextjs',
      parameters: {
        typescript: true,
        tailwind: true
      }
    },
    {
      id: 'ui/shadcn-ui',
      parameters: {
        components: ['button', 'card']
      }
    }
    // Add your new adapter here
  ]
};

export default testGenome;
```

## 📤 Submitting Changes

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bugfix branch
git checkout -b fix/issue-description
```

### 2. Make Your Changes

```bash
# Make your changes
# Test thoroughly
# Update documentation if needed

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add date utilities adapter

- Add date-fns integration
- Include formatDate and getCurrentDate utilities
- Add timezone parameter support"
```

### 3. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
# Include:
# - Clear title
# - Description of changes
# - Testing instructions
# - Screenshots if UI changes
```

### 4. PR Template

```markdown
## Description
Brief description of what this PR does

## Changes
- [ ] Added new adapter
- [ ] Fixed existing adapter
- [ ] Updated documentation
- [ ] Other: ___________

## Testing
- [ ] Tested with dry run
- [ ] Tested actual generation
- [ ] Verified generated project builds
- [ ] Verified generated project runs

## Screenshots
(If applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🎯 Common Contribution Types

### 1. Documentation Fixes
- Fix typos and errors
- Improve clarity
- Add missing information
- Update examples

### 2. Adapter Improvements
- Add new parameters
- Improve existing parameters
- Add new features
- Fix bugs

### 3. New Adapters
- Add support for new technologies
- Create utility adapters
- Add testing adapters
- Add deployment adapters

### 4. Integration Improvements
- Fix compatibility issues
- Add new integration features
- Improve error handling
- Add better type safety

### 5. Feature Enhancements
- Add new business capabilities
- Improve existing features
- Fix UI/UX issues
- Add new sub-features

## 🆘 Getting Help

### Before Asking
1. **Check existing issues** - Your question might already be answered
2. **Read the documentation** - The answer might be in the guides
3. **Search discussions** - Look for similar questions
4. **Try the examples** - Test with working examples first

### Where to Ask
- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and ideas
- **Discord** - For real-time help and chat
- **Pull Request Comments** - For specific PR feedback

### What to Include
- **Clear description** of what you're trying to do
- **Steps to reproduce** if it's a bug
- **Expected vs actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Error messages** if any

## 🎉 Success!

If you've followed this guide, you should now:

- ✅ Have a working development environment
- ✅ Understand the contribution process
- ✅ Know how to test your changes
- ✅ Be ready to submit your first PR

**Welcome to The Architech contributor community!** 🚀

---

**Need help?** Join our [Discord community](https://discord.gg/thearchitech) or [open an issue](https://github.com/the-architech/cli/issues) on GitHub.
