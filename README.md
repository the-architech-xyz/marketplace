# @thearchitech/marketplace

The official marketplace package for The Architech CLI, providing type-safe adapters and integrations for building production-ready applications.

## 🚀 Features

- **Type-Safe Development**: Auto-generated TypeScript definitions for all modules
- **Comprehensive Library**: 20+ adapters and 20+ integrations
- **Auto-Complete Support**: Full IDE support with IntelliSense
- **Runtime Validation**: Built-in parameter validation and default values

## 📦 Installation

```bash
npm install @thearchitech/marketplace
```

## 🎯 Usage

### Type-Safe Genome Development

```typescript
import { Genome } from '@thearchitech/marketplace';

const myGenome: Genome = {
  version: '1.0.0',
  project: {
    name: 'my-awesome-app',
    description: 'A modern full-stack application',
    version: '1.0.0',
    framework: 'nextjs'
  },
  modules: [
    {
      id: 'framework/nextjs',
      parameters: {
        appRouter: true,
        typescript: true,
        tailwind: true
      },
      features: {
        apiRoutes: true,
        middleware: true,
        performance: true
      }
    },
    {
      id: 'database/drizzle',
      parameters: {
        provider: 'postgresql',
        migrations: true
      },
      features: {
        queryBuilder: true,
        migrations: true,
        seeding: false
      }
    }
  ]
};

export default myGenome;
```

### Available Modules

#### 🎨 UI Adapters
- `ui/shadcn-ui` - Beautiful, accessible components
- `ui/tailwind` - Utility-first CSS framework
- `ui/forms` - Form management and validation

#### 🗄️ Database Adapters
- `database/drizzle` - Type-safe SQL ORM
- `database/prisma` - Next-generation ORM
- `database/typeorm` - Enterprise ORM
- `database/sequelize` - Promise-based ORM

#### 🔐 Authentication Adapters
- `auth/better-auth` - Modern authentication library

#### 🧪 Testing Adapters
- `testing/vitest` - Fast unit testing framework

#### 🔗 Integrations
- `drizzle-nextjs-integration` - Complete Drizzle + Next.js setup
- `web3-shadcn-integration` - Web3 components with Shadcn/ui
- `resend-nextjs-integration` - Email service integration
- And many more...

## 🔧 Development

### Type Generation

Types are automatically generated from module schemas:

```bash
npm run types:generate
```

### Building

```bash
npm run build
```

## 📚 Documentation

- [CLI Documentation](https://the-architech.dev)
- [Module Reference](https://the-architech.dev/modules)
- [Examples](https://the-architech.dev/examples)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/the-architech-xyz/marketplace/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- [GitHub Issues](https://github.com/the-architech-xyz/marketplace/issues)
- [Discord Community](https://discord.gg/the-architech)
- [Documentation](https://the-architech.dev)

---

Built with ❤️ by The Architech Team