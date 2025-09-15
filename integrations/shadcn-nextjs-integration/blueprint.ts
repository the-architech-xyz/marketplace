import { Blueprint } from '@thearchitech.xyz/types';

export const blueprint: Blueprint = {
  id: 'shadcn-nextjs-integration',
  name: 'Shadcn Next.js Integration',
  description: 'Complete Next.js integration for Shadcn/ui with modern components and optimizations',
  version: '3.0.0',
  actions: [
    // Install Next.js specific dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'next-themes',
        'next-seo',
        'next-sitemap',
        'sharp',
        '@next/bundle-analyzer',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'sonner'
      ],
      isDev: false
    },
    // Install additional Shadcn packages for Next.js
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge', 'tailwindcss-animate'],
      isDev: false
    },
    
    // PURE MODIFIER: Enhance Tailwind config with Shadcn theme
    {
      type: 'ENHANCE_FILE',
      path: 'tailwind.config.js',
      modifier: 'js-config-merger',
      params: {
        exportName: 'module.exports',
        propertiesToMerge: {
          plugins: ['tailwindcss-animate'],
          content: [
            './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
            './src/components/**/*.{js,ts,jsx,tsx,mdx}',
            './src/app/**/*.{js,ts,jsx,tsx,mdx}',
          ],
          theme: {
            extend: {
              borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
              },
              colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                  DEFAULT: 'hsl(var(--card))',
                  foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                  DEFAULT: 'hsl(var(--popover))',
                  foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                  DEFAULT: 'hsl(var(--primary))',
                  foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                  DEFAULT: 'hsl(var(--secondary))',
                  foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                  DEFAULT: 'hsl(var(--muted))',
                  foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                  DEFAULT: 'hsl(var(--accent))',
                  foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                  DEFAULT: 'hsl(var(--destructive))',
                  foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                  '1': 'hsl(var(--chart-1))',
                  '2': 'hsl(var(--chart-2))',
                  '3': 'hsl(var(--chart-3))',
                  '4': 'hsl(var(--chart-4))',
                  '5': 'hsl(var(--chart-5))',
                },
              },
            },
          },
        },
        mergeStrategy: 'deep'
      }
    },
    
    // PURE MODIFIER: Enhance TypeScript config with path mapping
    {
      type: 'ENHANCE_FILE',
      path: 'tsconfig.json',
      modifier: 'json-object-merger',
      params: {
        path: ['compilerOptions'],
        propertiesToMerge: {
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*']
          }
        },
        mergeStrategy: 'deep'
      }
    },
    
    // PURE MODIFIER: Enhance globals.css with Shadcn CSS variables
    {
      type: 'ENHANCE_FILE',
      path: 'src/app/globals.css',
      modifier: 'ts-module-enhancer',
      params: {
        statementsToAppend: [
          {
            type: 'raw',
            content: `@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`
          }
        ]
      }
    },
    
    // PURE MODIFIER: Enhance components.json with Next.js specific configuration
    {
      type: 'ENHANCE_FILE',
      path: 'components.json',
      modifier: 'json-object-merger',
      params: {
        path: [],
        propertiesToMerge: {
          style: 'default',
          rsc: true,
          tsx: true,
          tailwind: {
            config: 'tailwind.config.js',
            css: 'src/app/globals.css',
            baseColor: 'slate',
            cssVariables: true,
            prefix: ''
          },
          aliases: {
            components: '@/components',
            utils: '@/lib/utils'
          }
        },
        mergeStrategy: 'deep'
      }
    },
    
    // Create Next.js optimized components
    {
      type: 'CREATE_FILE',
      path: 'src/components/nextjs/next-image.tsx',
      content: `import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface NextImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  sizes?: string
  fill?: boolean
  style?: React.CSSProperties
}

export function NextImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  quality = 75,
  sizes,
  fill = false,
  style,
  ...props
}: NextImageProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        sizes={sizes}
        fill={fill}
        style={style}
        {...props}
      />
    </div>
  )
}`
    },
    
    // Create Next.js Link component
    {
      type: 'CREATE_FILE',
      path: 'src/components/nextjs/next-link.tsx',
      content: `import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NextLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  passHref?: boolean
  legacyBehavior?: boolean
}

export function NextLink({
  href,
  children,
  className,
  prefetch = true,
  replace = false,
  scroll = true,
  shallow = false,
  passHref = false,
  legacyBehavior = false,
  ...props
}: NextLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      legacyBehavior={legacyBehavior}
      className={cn('transition-colors hover:text-primary', className)}
      {...props}
    >
      {children}
    </Link>
  )
}`
    },
    
    // Create Next.js optimized form components
    {
      type: 'CREATE_FILE',
      path: 'src/components/nextjs/forms.tsx',
      content: `'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

// Form field wrapper
interface FormFieldProps {
  children: React.ReactNode
  error?: string
  className?: string
}

export function FormField({ children, error, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {children}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

// Form input with validation
interface FormInputProps {
  label: string
  error?: string
  className?: string
  required?: boolean
  [key: string]: any
}

export function FormInput({ 
  label, 
  error, 
  className, 
  required = false,
  ...props 
}: FormInputProps) {
  return (
    <FormField error={error} className={className}>
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input {...props} />
    </FormField>
  )
}

// Form textarea with validation
interface FormTextareaProps {
  label: string
  error?: string
  className?: string
  required?: boolean
  [key: string]: any
}

export function FormTextarea({ 
  label, 
  error, 
  className, 
  required = false,
  ...props 
}: FormTextareaProps) {
  return (
    <FormField error={error} className={className}>
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea {...props} />
    </FormField>
  )
}

// Form select with validation
interface FormSelectProps {
  label: string
  error?: string
  className?: string
  required?: boolean
  options: Array<{ value: string; label: string }>
  placeholder?: string
  [key: string]: any
}

export function FormSelect({ 
  label, 
  error, 
  className, 
  required = false,
  options,
  placeholder = "Select an option",
  ...props 
}: FormSelectProps) {
  return (
    <FormField error={error} className={className}>
      <Label htmlFor={props.id || props.name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  )
}

// Form submit button
interface FormSubmitProps {
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
  className?: string
  [key: string]: any
}

export function FormSubmit({ 
  children, 
  loading = false, 
  disabled = false,
  className,
  ...props 
}: FormSubmitProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || loading}
      className={cn('w-full', className)}
      {...props}
    >
      {loading && (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </Button>
  )
}

// Hook for form validation
export function useFormValidation<T extends z.ZodType>(schema: T) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
}`
    },
    
    // Create Next.js optimized page components
    {
      type: 'CREATE_FILE',
      path: 'src/components/nextjs/pages.tsx',
      content: `import React from 'react'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'

// Page container
interface PageContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export function PageContainer({ 
  children, 
  className,
  maxWidth = 'xl'
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  }

  return (
    <div className={cn(
      'mx-auto px-4 py-8',
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  )
}

// Page header
interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({ 
  title, 
  description, 
  className,
  children 
}: PageHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center space-x-2">
          {children}
        </div>
      )}
    </div>
  )
}

// Page section
interface PageSectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

export function PageSection({ 
  children, 
  className,
  title,
  description 
}: PageSectionProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || description) && (
        <div>
          {title && (
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}`
    },
    
    // Create Next.js SEO components
    {
      type: 'CREATE_FILE',
      path: 'src/components/nextjs/seo.tsx',
      content: `import React from 'react'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    url?: string
    siteName?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
    locale?: string
    type?: string
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    title?: string
    description?: string
    images?: string[]
    creator?: string
  }
  robots?: string
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export function SEO({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  robots = 'index,follow',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: SEOProps) {
  const seoConfig = {
    title,
    description,
    canonical,
    openGraph: {
      title: title,
      description: description,
      url: openGraph?.url,
      siteName: openGraph?.siteName || title,
      images: openGraph?.images || [],
      locale: openGraph?.locale || 'en_US',
      type: openGraph?.type || 'website',
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: twitter?.title || title,
      description: twitter?.description || description,
      images: twitter?.images || [],
      creator: twitter?.creator,
    },
    robots,
    additionalMetaTags: [
      ...(keywords.length > 0 ? [{ name: 'keywords', content: keywords.join(', ') }] : []),
      ...(author ? [{ name: 'author', content: author }] : []),
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(section ? [{ property: 'article:section', content: section }] : []),
      ...(tags.length > 0 ? [{ property: 'article:tag', content: tags.join(', ') }] : []),
    ],
  }

  return <NextSeo {...seoConfig} />
}`
    }
  ]
};