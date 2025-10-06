# Contributing to The Architech

## Overview

Thank you for your interest in contributing to The Architech! This guide will help you understand our development process and how to contribute effectively.

## Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/the-architech/cli.git
cd cli
```

### 2. Install Dependencies
```bash
# Install CLI dependencies
npm install

# Install marketplace dependencies
cd marketplace
npm install

# Install types package dependencies
cd ../types-package
npm install
```

### 3. Build the Project
```bash
# Build types package first
cd types-package
npm run build

# Build CLI
cd ../Architech
npm run build

# Build marketplace
cd ../marketplace
npm run build
```

## Architecture Overview

The Architech follows a 3-tier architecture:

1. **Adapters**: Pure technology installation
2. **Integrators**: Technical bridges between adapters
3. **Features**: Complete business capabilities

## Contribution Types

### 1. Adapters
- Add new technology support
- Improve existing adapters
- Fix configuration issues

### 2. Integrators
- Create new adapter connections
- Improve existing integrations
- Fix compatibility issues

### 3. Features
- Add new business capabilities
- Improve existing features
- Fix UI/UX issues

### 4. Documentation
- Improve guides and tutorials
- Fix typos and errors
- Add examples

### 5. CLI
- Add new commands
- Improve error handling
- Fix generation issues

## Development Workflow

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Follow the architecture principles
- Write tests for your changes
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run tests
npm test

# Test generation with dry run
node dist/index.js new /path/to/marketplace/genomes/simple-app.genome.ts --dry-run

# Test actual generation
node dist/index.js new /path/to/marketplace/genomes/simple-app.genome.ts
```

### 4. Submit a Pull Request
- Provide a clear description
- Include tests
- Reference any related issues

## Coding Standards

### TypeScript
- Use strict TypeScript
- Provide proper types
- Avoid `any` types
- Use interfaces for complex objects

### Code Style
- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable names
- Write clear comments

### Testing
- Write unit tests for new code
- Include integration tests
- Test error cases
- Maintain test coverage

## Module Development

### Creating an Adapter
1. Create directory structure
2. Add `adapter.json` configuration
3. Create `blueprint.ts` with actions
4. Add template files
5. Write tests

### Creating an Integrator
1. Create directory structure
2. Add `integration.json` configuration
3. Create `blueprint.ts` with actions
4. Add template files
5. Write tests

### Creating a Feature
1. Create directory structure
2. Add `feature.json` configuration
3. Create `blueprint.ts` with actions
4. Add template files
5. Write tests

## Testing Guidelines

### Unit Tests
```typescript
import { Genome } from '@thearchitech.xyz/marketplace';

describe('Genome Validation', () => {
  it('should validate genome configuration', () => {
    const genome: Genome = {
      version: '1.0.0',
      project: {
        name: 'test-app',
        framework: 'nextjs'
      },
      modules: [
        {
          id: 'framework/nextjs',
          parameters: {
            typescript: true,
            tailwind: true
          }
        }
      ]
    };
    
    expect(genome.modules).toHaveLength(1);
    expect(genome.project.framework).toBe('nextjs');
  });
});
```

### Integration Tests
```bash
# Test genome with dry run
node dist/index.js new test-genome.genome.ts --dry-run

# Test actual generation
node dist/index.js new test-genome.genome.ts

# Verify generated project
cd test-app
npm install
npm run build
```

## Pull Request Process

### 1. Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes

### 2. PR Description
- Clear title
- Description of changes
- Testing instructions
- Screenshots (if UI changes)

### 3. Review Process
- Maintainers will review
- Address feedback
- Update PR as needed
- Merge when approved

## Issue Reporting

### Bug Reports
- Use the bug report template
- Include reproduction steps
- Provide environment details
- Include error messages

### Feature Requests
- Use the feature request template
- Describe the use case
- Provide examples
- Consider alternatives

## Release Process

### Versioning
- Follow semantic versioning
- Update CHANGELOG.md
- Tag releases
- Update documentation

### Release Notes
- List new features
- Document breaking changes
- Include migration guides
- Highlight improvements

## Community Guidelines

### Code of Conduct
- Be respectful
- Be constructive
- Be patient
- Be helpful

### Communication
- Use GitHub issues for bugs
- Use discussions for questions
- Use PRs for code changes
- Be clear and concise

## Getting Help

### Documentation
- Check existing guides
- Read API documentation
- Look at examples
- Search issues

### Community
- Join our Discord
- Ask questions
- Share ideas
- Help others

### Maintainers
- @maintainer1
- @maintainer2
- @maintainer3

## License

By contributing to The Architech, you agree that your contributions will be licensed under the MIT License.

## Thank You

Thank you for contributing to The Architech! Your contributions help make the ecosystem better for everyone.
