/**
 * Next.js Performance Feature Blueprint
 * 
 * Provides performance optimization tools specific to Next.js
 * Includes Sharp for image optimization and bundle analyzer
 */

import { Blueprint } from '@thearchitech.xyz/types';

export const nextjsPerformanceBlueprint: Blueprint = {
  id: 'nextjs-performance-setup',
  name: 'Next.js Performance Setup',
  actions: [
    // Install performance packages
    {
      type: 'INSTALL_PACKAGES',
      packages: ['sharp', '@next/bundle-analyzer']
    },
    // Create Next.js config with performance optimizations
    {
      type: 'CREATE_FILE',
      path: 'next.config.js',
      content: `/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
`
    },
    // Create performance utilities
    {
      type: 'CREATE_FILE',
      path: 'src/lib/performance.ts',
      content: `/**
 * Performance utilities for Next.js
 */

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
  }
}

/**
 * Performance monitoring
 */
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(\`\${name} took \${end - start} milliseconds\`);
  } else {
    fn();
  }
}
`
    },
    // Update package.json scripts
    {
      type: 'MODIFY_FILE',
      path: 'package.json',
      content: `{
  "scripts": {
    "analyze": "ANALYZE=true npm run build"
  }
}`,
      action: 'merge'
    }
  ]
};
