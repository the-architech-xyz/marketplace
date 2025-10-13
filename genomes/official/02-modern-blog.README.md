# 📝 Modern Blog / CMS Starter

**A production-ready blogging platform with internationalization, email newsletters, and content management.**

---

## Use Case

Perfect for:
- **Tech blogs** and engineering blogs
- **Documentation sites** with multiple authors
- **Content publishers** with international audiences
- **Newsletter platforms** with email campaigns
- **Portfolio sites** for writers and creators

Real-world examples:
- Next.js blog
- Dev.to clone
- Substack alternative
- Company engineering blog

---

## Key Features

📝 **Content Management**:
- Markdown/MDX support for blog posts
- Rich text editor (via Shadcn UI)
- Draft/publish workflow
- Author management
- Comment system (via database relations)

🌍 **Internationalization**:
- 4 languages out of the box (EN, FR, ES, DE)
- Localized routing (/en/blog, /fr/blog)
- Date and number formatting
- Easy to add more languages

📧 **Email Newsletters**:
- Email capture forms
- Newsletter campaigns
- Template editor
- Open rate analytics
- Subscriber management

🔐 **Author Authentication**:
- Email/password for authors
- Session management
- Simple role system (author vs editor)
- Password reset

🎨 **Beautiful UI**:
- Shadcn UI design system
- Responsive blog layouts
- Dark mode support
- Typography optimized for reading

📊 **Performance & Monitoring**:
- Image optimization
- SEO optimization (meta tags, sitemaps)
- Error tracking (Sentry)
- Performance monitoring

---

## Technology Stack

**Framework**: Next.js 15 (App Router, MDX support)  
**Database**: Drizzle ORM + PostgreSQL  
**Email**: Resend (transactional + campaigns)  
**Auth**: Better Auth (email/password)  
**I18n**: next-intl (4 languages)  
**UI**: Shadcn UI + Tailwind v4  
**State**: Zustand (draft persistence)  
**Monitoring**: Sentry (errors + performance)  
**Testing**: Vitest (unit tests)

**Total Dependencies**: ~45 packages  
**Build Time**: ~2 minutes  
**Bundle Size**: ~850 KB (production)

---

## Architectural Pattern

**Pattern**: Feature-Only (Pattern B) + Content-First

**Why No Stripe Connector?**
- Blogs don't need complex billing
- Email is simple (Pattern B sufficient)
- Auth is SDK-driven (Pattern C)

**Database Relations**:
```typescript
Posts → Authors → Comments
Posts → Categories → Tags
Subscribers → Campaigns → Emails
```

**This genome demonstrates**:
- Content-first architecture
- Internationalization best practices
- Email marketing integration
- Simple auth workflow

---

## What You Get

**Database Schema**:
- Posts (title, content, slug, published_at, author_id)
- Authors (name, email, bio, avatar)
- Comments (content, post_id, author_id)
- Categories & Tags (many-to-many)
- Subscribers (email, preferences)
- Campaigns (name, template_id, sent_at)

**API Routes**:
- `/api/posts` - CRUD operations
- `/api/authors` - Author management
- `/api/comments` - Comment moderation
- `/api/emails` - Newsletter management
- `/api/auth` - Authentication

**UI Pages**:
- `/` - Blog homepage (post list)
- `/[locale]/blog` - Localized blog
- `/blog/[slug]` - Post detail page
- `/author/[id]` - Author profile
- `/admin` - Content management dashboard
- `/admin/emails` - Newsletter manager

**Email Templates**:
- Welcome email (new subscribers)
- New post notification
- Newsletter template
- Comment notification (for authors)

---

## Internationalization

**Supported Languages**:
- 🇬🇧 English (default)
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇩🇪 German

**Localized Content**:
- Blog post translations (stored in database)
- UI strings (via next-intl)
- Dates (formatted per locale)
- URLs (e.g., /en/about-us, /fr/a-propos)

**Add More Languages**:
```typescript
// Just update the genome
locales: ['en', 'fr', 'es', 'de', 'ja', 'zh']
```

---

## Content Workflow

1. **Author signs in** → `/admin`
2. **Create draft post** → Markdown editor
3. **Save draft** → Zustand persistence (auto-save)
4. **Publish post** → Database + SEO metadata
5. **Send newsletter** → Email to subscribers
6. **Track analytics** → Open rates, engagement

---

## SEO Optimized

**Automatic Generation**:
- Meta tags (title, description, OG image)
- Sitemap.xml (all published posts)
- RSS feed
- Schema.org JSON-LD (blog posting markup)
- Canonical URLs
- Robots.txt

**Performance**:
- Image optimization (Next.js Image)
- Static generation for posts (ISR)
- Edge runtime for API routes

---

## Deployment

**Recommended**: Vercel

**Requirements**:
- PostgreSQL database (Vercel Postgres recommended)
- Resend API key (for emails)
- Environment variables:
  ```env
  DATABASE_URL=postgresql://...
  RESEND_API_KEY=re_...
  BETTER_AUTH_SECRET=...
  NEXTAUTH_URL=https://yourblog.com
  ```

**Cost**: $0-20/month
- Vercel: Free tier
- Postgres: Free tier (Vercel)
- Resend: Free tier (3,000 emails/month)

---

## Extend This Genome

**Want to add**:

**Paid Subscriptions?**
```typescript
{ id: 'payment/stripe' },
{ id: 'features/payments/backend/stripe-nextjs' },
```

**Advanced Analytics?**
```typescript
{ id: 'features/analytics/frontend/shadcn' },
```

**Comment Moderation?**
```typescript
// Already supported via database relations
// Just add UI in admin panel
```

---

## Why This Stack?

**Next.js 15**: Best-in-class React framework, perfect for blogs  
**Drizzle**: Lightweight ORM, perfect for content relations  
**Resend**: Modern email, great deliverability  
**next-intl**: Industry standard for i18n in Next.js  
**Shadcn UI**: Beautiful, accessible, customizable

**This is the modern blog stack.** 📝

---

**Deploy your blog in minutes. Scale to millions of readers.** 🚀


