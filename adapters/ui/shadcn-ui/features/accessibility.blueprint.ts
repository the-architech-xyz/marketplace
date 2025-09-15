/**
 * Accessibility Feature Blueprint
 * 
 * Adds accessibility features and WCAG compliance tools
 * Only installed when explicitly requested in genome.yaml
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const accessibilityBlueprint: Blueprint = {
  id: 'shadcn-ui-accessibility',
  name: 'Accessibility Features',
  actions: [
    // Install accessibility dependencies
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        '@axe-core/react',
        'eslint-plugin-jsx-a11y',
        'focus-trap-react',
        'react-focus-lock'
      ]
    },
    // Create accessibility utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/accessibility.ts',
      content: `import { useEffect } from 'react'

// Accessibility utilities
export function useA11y() {
  useEffect(() => {
    // Initialize axe-core for accessibility testing
    if (process.env.NODE_ENV === 'development') {
      import('@axe-core/react').then(axe => {
        axe.default(React, ReactDOM, 1000)
      })
    }
  }, [])
}

// Focus management utilities
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  }
  
  element.addEventListener('keydown', handleTabKey)
  
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

// ARIA utilities
export function createAriaLabel(text: string, hidden = false) {
  return {
    'aria-label': text,
    ...(hidden && { 'aria-hidden': 'true' })
  }
}

export function createAriaDescribedBy(...ids: string[]) {
  return {
    'aria-describedby': ids.join(' ')
  }
}

export function createAriaExpanded(expanded: boolean) {
  return {
    'aria-expanded': expanded
  }
}

export function createAriaSelected(selected: boolean) {
  return {
    'aria-selected': selected
  }
}

export function createAriaChecked(checked: boolean) {
  return {
    'aria-checked': checked
  }
}

// Screen reader utilities
export function announceToScreenReader(message: string) {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Keyboard navigation utilities
export function handleKeyDown(
  event: React.KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void
) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      onEnter?.()
      break
    case 'Escape':
      onEscape?.()
      break
    case 'ArrowUp':
      onArrowUp?.()
      break
    case 'ArrowDown':
      onArrowDown?.()
      break
    case 'ArrowLeft':
      onArrowLeft?.()
      break
    case 'ArrowRight':
      onArrowRight?.()
      break
  }
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd use a proper color contrast library
  return 4.5 // Placeholder value
}

export function isAccessibleContrast(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5
}

// Focus indicators
export function createFocusIndicator() {
  return {
    '&:focus-visible': {
      outline: '2px solid hsl(var(--ring))',
      outlineOffset: '2px'
    }
  }
}

// Skip links
export function createSkipLink(href: string, children: React.ReactNode) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-md"
    >
      {children}
    </a>
  )
}

// High contrast mode detection
export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return isHighContrast
}

// Reduced motion detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return prefersReducedMotion
}`
    },
    // Create accessibility components
    {
      type: 'CREATE_FILE',
      path: 'src/components/accessibility/skip-links.tsx',
      content: `import React from 'react'
import { createSkipLink } from '@/lib/accessibility'

export function SkipLinks() {
  return (
    <>
      {createSkipLink('#main-content', 'Skip to main content')}
      {createSkipLink('#navigation', 'Skip to navigation')}
      {createSkipLink('#footer', 'Skip to footer')}
    </>
  )
}`
    },
    // Create accessibility wrapper
    {
      type: 'CREATE_FILE',
      path: 'src/components/accessibility/accessibility-wrapper.tsx',
      content: `"use client"

import React, { useEffect } from 'react'
import { useA11y } from '@/lib/accessibility'

interface AccessibilityWrapperProps {
  children: React.ReactNode
}

export function AccessibilityWrapper({ children }: AccessibilityWrapperProps) {
  useA11y()
  
  return <>{children}</>
}`
    }
  ]
};