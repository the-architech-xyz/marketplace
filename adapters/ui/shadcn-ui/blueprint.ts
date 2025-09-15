/**
 * Shadcn/ui Complete Blueprint
 * 
 * Sets up a comprehensive Shadcn/ui system with modern components,
 * theming, accessibility, and production-ready configuration
 * Advanced features are available as separate features
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const shadcnUiBlueprint: Blueprint = {
  id: 'shadcn-ui-base-setup',
  name: 'Shadcn/ui Complete Setup',
  actions: [
    // Install core dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@radix-ui/react-slot',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'tailwindcss-animate',
        'lucide-react',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-label',
        '@radix-ui/react-select',
        '@radix-ui/react-separator',
        '@radix-ui/react-sheet',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-toast',
        '@radix-ui/react-tooltip',
        '@radix-ui/react-accordion',
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-collapsible',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-menubar',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-popover',
        '@radix-ui/react-progress',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-scroll-area',
        '@radix-ui/react-slider',
        '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group',
        'cmdk',
        'date-fns',
        'react-day-picker',
        'react-hook-form',
        '@hookform/resolvers',
        'zod',
        'sonner',
        'next-themes'
      ]
    },
    {
      type: 'INSTALL_PACKAGES',
      packages: ['@types/node'],
      isDev: true
    },
    // Initialize Shadcn/ui
    {
      type: 'RUN_COMMAND',
      command: 'npx shadcn@latest init --yes --defaults'
    },
    // Install core components only (minimal base installation)
    {
      type: 'RUN_COMMAND',
      command: 'npx shadcn@latest add button input card'
    },
    // Create comprehensive components.json
    {
      type: 'CREATE_FILE',
      path: 'components.json',
      content: `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`
    },
    // Create comprehensive utils
    {
      type: 'CREATE_FILE',
      path: 'src/lib/utils.ts',
      content: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(new Date(date))
}

export function formatBytes(
  bytes: number,
  decimals = 2
) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\\w\\s-]/g, "")
    .replace(/[\\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + "..." : str
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function camelCase(str: string) {
  return str.replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase()
  }).replace(/\\s+/g, "")
}

export function kebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\\s_]+/g, "-")
    .toLowerCase()
}

export function pascalCase(str: string) {
  return str
    .replace(/(?:^\\w|[A-Z]|\\b\\w)/g, (word) => {
      return word.toUpperCase()
    })
    .replace(/\\s+/g, "")
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
  return emailRegex.test(email)
}

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}`
    },
    // Note: Theme provider and theme toggle are now optional features
    // They will be installed only when the theming feature is requested
  ]
};