# The Architech React Marketplace

> **Opinionated React ecosystem modules for The Architech CLI**

This marketplace provides a complete set of React-focused modules including adapters, connectors, and features for building modern web applications.

## 🚀 Quick Start

```bash
# Use with CLI
architech new my-app.genome.ts --marketplace @thearchitech/react

# Or specify in genome
architech new my-app.genome.ts
```

## 📚 Documentation

- **[Marketplace Guide](https://docs.thearchitech.dev/marketplace)** - Complete guide
- **[Module Deep Dives](https://docs.thearchitech.dev/marketplace/adapters-deep-dive)** - Adapters, Connectors, Features
- **[Architecture Patterns](https://docs.thearchitech.dev/architecture)** - SDK-Driven vs Custom-Logic
- **[Contributing](https://docs.thearchitech.dev/contributing)** - How to contribute modules

## 📦 Available Modules

### **27 Adapters** - Raw Technologies
- **Frameworks:** Next.js, Remix, Astro, SvelteKit
- **UI Libraries:** Shadcn/ui, Tailwind CSS, Radix UI
- **Databases:** Drizzle, Prisma, PostgreSQL, MongoDB
- **Auth:** Better Auth, NextAuth.js, Clerk
- **Payments:** Stripe, Paddle, LemonSqueezy
- **AI:** Vercel AI SDK, OpenAI, Anthropic
- **Infrastructure:** Docker, Vercel, AWS, Railway

### **11 Connectors** - Technology Bridges
- **Framework-Wiring:** `drizzle-nextjs`, `tanstack-query-nextjs`
- **SDK-Backend:** `better-auth-nextjs`, `stripe-nextjs-drizzle`

### **19 Features** - Complete Capabilities
- **Auth:** Complete authentication system
- **Payments:** Stripe integration with billing
- **AI Chat:** Conversational AI interface
- **Teams:** Team management and RBAC
- **Emailing:** Transactional email system
- **Monitoring:** Error tracking and analytics

## 🏗️ Architecture

This marketplace follows the **"Opinionated Core, Agnostic Edges"** philosophy:

- **Golden Core:** TanStack Query + Zustand + React Hook Form + Zod
- **Agnostic Edges:** Any UI library, database, auth provider, deployment platform

## 🎯 Module Types

### **Adapters** - Raw Materials
Single technology configurations (Next.js, Drizzle, Better Auth)

### **Connectors** - Smart Bridges  
- **Regular:** Connect technologies (`drizzle-nextjs`)
- **SDK-Backend:** Replace entire backends (`better-auth-nextjs`)

### **Features** - Complete Capabilities
Three-layer architecture:
- **Backend:** Custom logic or SDK integration
- **Tech-Stack:** Golden Core wrappers (TanStack Query hooks)
- **Frontend:** UI components (Shadcn/ui)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build marketplace
npm run build

# Validate modules
npm run validate:all

# Generate manifests
npm run generate:manifests
```

## 🤝 Contributing

Want to add a new module? See our [Contributing Guide](https://docs.thearchitech.dev/contributing).

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by The Architech Team**