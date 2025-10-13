# 👋 Hello World Starter

**The perfect starting point for your first Architech project.**

---

## Use Case

Designed for:
- **First-time Architech users** learning the platform
- **Rapid prototyping** of new ideas
- **Simple landing pages** and marketing sites
- **Learning Next.js** with best practices baked in

Not designed for: Complex applications with authentication, databases, or payments.

---

## Key Features

✨ **Production-Ready Basics**:
- Next.js 15 with App Router
- TypeScript strict mode
- Tailwind CSS v4
- Shadcn UI components
- ESLint + Prettier configured

🎨 **Modern UI**:
- Shadcn UI design system
- Responsive by default
- Dark mode ready (Shadcn default)
- Beautiful welcome screen

🛠️ **Developer Experience**:
- Hot reload
- Type safety
- Linting on save
- Import aliases (@/components)

---

## Technology Stack

**Framework**: Next.js 15 (App Router)  
**Language**: TypeScript 5.x  
**Styling**: Tailwind CSS v4 + Shadcn UI  
**Quality**: ESLint 8.x + Prettier 3.x

**Total Dependencies**: ~20 packages  
**Build Time**: ~30 seconds  
**Size**: ~500 KB (production bundle)

---

## Architectural Pattern

**Pattern**: Minimal Foundation

**Philosophy**:
- Uses ONLY the essential technologies
- No database (use when needed)
- No authentication (add when needed)
- No state management (React state sufficient)

**This genome demonstrates**:
- The Architech's "start small, grow as needed" philosophy
- How few dependencies you need for a production app
- Clean, modern development setup

---

## What You Get

**Generated Project Structure**:
```
hello-world-app/
├── app/
│   ├── page.tsx          # Welcome screen
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Tailwind setup
├── components/
│   └── ui/               # Shadcn components
├── lib/
│   └── utils.ts          # Utility functions
├── package.json          # Minimal dependencies
├── tailwind.config.ts    # Tailwind v4 setup
├── tsconfig.json         # TypeScript config
└── .eslintrc.json        # Linting rules
```

**Ready to Deploy**:
- ✅ Vercel (one-click)
- ✅ Netlify
- ✅ Any Node.js host

---

## Quick Start

```bash
# Generate the app
architech new marketplace/genomes/official/01-hello-world.genome.ts

# Install dependencies
cd hello-world-app
npm install

# Start development
npm run dev
```

Visit `http://localhost:3000` → See beautiful welcome screen

---

## Next Steps

**To add features**:
- **Need auth?** → Add `auth/better-auth` + `features/auth`
- **Need database?** → Add `database/drizzle`
- **Need payments?** → Add `payment/stripe` + `features/payments`

**The Architech makes scaling effortless.**

---

## Ideal For

✅ Learning The Architech  
✅ Weekend projects  
✅ Landing pages  
✅ Prototypes  
✅ Marketing sites

❌ Not for: Complex SaaS, e-commerce, or data-heavy apps

---

**This is your foundation. Build anything from here.** 🚀


