/**
 * Next.js Performance Feature Blueprint
 * 
 * Modern performance optimization tools for Next.js 15+
 * Includes bundle analysis, image optimization, and performance monitoring
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextjsPerformanceBlueprint: Blueprint = {
  id: 'nextjs-performance-setup',
  name: 'Next.js Performance Optimization',
  description: 'Advanced performance optimization tools for Next.js 15+',
  actions: [
    // Install performance packages
    {
      type: 'INSTALL_PACKAGES',
      packages: [
        'sharp@^0.33.0',
        '@next/bundle-analyzer@^15.0.0',
        'web-vitals@^4.0.0',
        'lighthouse@^12.0.0'
      ]
    },
    // Enhance next.config.js with performance optimizations
    {
      type: 'ENHANCE_FILE',
      path: 'next.config.js',
      content: `const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
  analyzerMode: 'static',
  analyzerPort: 8888,
});

const nextConfig = {
  // ... existing config ...
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'framer-motion'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);`,
    },
    // Create performance utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/performance.ts',
      content: `/**
 * Performance utilities for Next.js 15+
 */

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

/**
 * Image optimization configuration
 */
export const imageConfig = {
  quality: 80,
  formats: ['image/webp', 'image/avif'] as const,
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder: 'blur' as const,
  blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
};

/**
 * Lazy loading configuration
 */
export const lazyConfig = {
  threshold: 0.1,
  rootMargin: '50px',
};

/**
 * Performance monitoring utilities
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Measure function execution time
   */
  measureFunction<T>(name: string, fn: () => T): T {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const start = performance.now();
      const result = fn();
      const end = performance.now();
      const duration = end - start;
      
      this.metrics.set(name, duration);
      console.log(\`\${name} took \${duration.toFixed(2)}ms\`);
      
      return result;
    }
    return fn();
  }

  /**
   * Measure async function execution time
   */
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const start = performance.now();
      const result = await fn();
      const end = performance.now();
      const duration = end - start;
      
      this.metrics.set(name, duration);
      console.log(\`\${name} took \${duration.toFixed(2)}ms\`);
      
      return result;
    }
    return fn();
  }

  /**
   * Get all collected metrics
   */
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
  }
}

/**
 * Web Vitals monitoring
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  getCLS((metric) => {
    console.log('CLS:', metric);
  });

  getFID((metric) => {
    console.log('FID:', metric);
  });

  getFCP((metric) => {
    console.log('FCP:', metric);
  });

  getLCP((metric) => {
    console.log('LCP:', metric);
  });

  getTTFB((metric) => {
    console.log('TTFB:', metric);
  });
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = '/fonts/inter.woff2';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // Preload critical CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'preload';
    cssLink.href = '/styles/critical.css';
    cssLink.as = 'style';
    document.head.appendChild(cssLink);
  }
}

/**
 * Image optimization utilities
 */
export const imageUtils = {
  /**
   * Generate responsive image sizes
   */
  generateSizes: (breakpoints: number[] = [640, 768, 1024, 1280, 1536]) => {
    return breakpoints.map((bp, index) => {
      const nextBp = breakpoints[index + 1];
      return nextBp ? \`(max-width: \${bp}px) 100vw, (max-width: \${nextBp}px) 50vw\` : \`(max-width: \${bp}px) 100vw, 50vw\`;
    }).join(', ');
  },

  /**
   * Generate blur placeholder
   */
  generateBlurPlaceholder: (width: number = 10, height: number = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, width, height);
    }
    return canvas.toDataURL();
  },
};

/**
 * Bundle analysis utilities
 */
export const bundleUtils = {
  /**
   * Analyze bundle size
   */
  analyzeBundle: async () => {
    if (typeof window !== 'undefined') {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      const metrics = await Promise.all([
        getCLS(),
        getFID(),
        getFCP(),
        getLCP(),
        getTTFB(),
      ]);

      return metrics;
    }
    return [];
  },
};
`
    },
    // Create performance monitoring component
    {
      type: 'CREATE_FILE',
      path: 'src/components/performance/PerformanceMonitor.tsx',
      content: `'use client';

import React, { useEffect, useState } from 'react';
import { PerformanceMonitor, initWebVitals } from '../../lib/performance.js';

interface PerformanceMetrics {
  [key: string]: number;
}

export const PerformanceMonitorComponent: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize Web Vitals monitoring
    initWebVitals();

    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      const monitor = PerformanceMonitor.getInstance();
      setMetrics(monitor.getMetrics());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        Show Performance
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-900">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2">
        {Object.entries(metrics).map(([name, value]) => (
          <div key={name} className="flex justify-between text-sm">
            <span className="text-gray-600">{name}:</span>
            <span className="font-mono text-gray-900">{value.toFixed(2)}ms</span>
          </div>
        ))}
        
        {Object.keys(metrics).length === 0 && (
          <p className="text-sm text-gray-500">No metrics collected yet</p>
        )}
      </div>
    </div>
  );
};`
    },
    // Update package.json scripts
    {
      type: 'MERGE_JSON',
      path: 'package.json',
      content: `{
  "scripts": {
    "analyze": "ANALYZE=true npm run build",
    "analyze:server": "ANALYZE=true npm run build && npx serve@latest out",
    "lighthouse": "lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html",
    "perf": "npm run build && npm run lighthouse"
  }
}`,
    }
  ]
};
