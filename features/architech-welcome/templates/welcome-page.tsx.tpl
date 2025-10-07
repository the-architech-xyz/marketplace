'use client';

import { motion } from 'framer-motion';
import { ProjectAnalyzer } from '@/lib/project-analyzer';
import { WelcomeLayout } from '@/components/welcome/welcome-layout';
import { TechStackCard } from '@/components/welcome/tech-stack-card';
import { ComponentShowcase } from '@/components/welcome/component-showcase';
import { ProjectStructure } from '@/components/welcome/project-structure';
import { QuickStartGuide } from '@/components/welcome/quick-start-guide';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Code, Palette, Database, Shield } from 'lucide-react';

// Mock project data - in real implementation, this would come from the genome
const projectData = {
  name: '{{project.name}}',
  description: '{{project.description}}',
  version: '{{project.version}}',
  modules: [
    {{#each modules}}
    {
      id: '{{id}}',
      name: '{{name}}',
      description: '{{description}}',
      version: '{{version}}'
    }{{#unless @last}},{{/unless}}
    {{/each}}
  ]
};

export default function WelcomePage() {
  const capabilities = ProjectAnalyzer.analyzeProject(projectData.modules);
  const projectStructure = ProjectAnalyzer.generateProjectStructure();

  return (
    <WelcomeLayout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 py-12"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Generated with The Architech
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {{feature.parameters.customTitle}}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {{feature.parameters.customDescription}}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg">
            View Documentation
          </Button>
        </motion.div>
      </motion.div>

      {/* Technology Stack */}
      {{#if feature.parameters.showTechStack}}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="py-12"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Technology Stack</h2>
          <p className="text-gray-600">Powerful technologies working together</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <TechStackCard capability={capability} />
            </motion.div>
          ))}
        </div>
      </motion.section>
      {{/if}}

      {/* Component Showcase */}
      {{#if feature.parameters.showComponents}}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="py-12"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Component Library</h2>
          <p className="text-gray-600">Beautiful, accessible components ready to use</p>
        </div>
        
        <ComponentShowcase />
      </motion.section>
      {{/if}}

      {/* Project Structure */}
      {{#if feature.parameters.showProjectStructure}}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="py-12"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Project Structure</h2>
          <p className="text-gray-600">Well-organized codebase for maintainability</p>
        </div>
        
        <ProjectStructure structure={projectStructure} />
      </motion.section>
      {{/if}}

      {/* Quick Start Guide */}
      {{#if feature.parameters.showQuickStart}}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="py-12"
      >
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Quick Start</h2>
          <p className="text-gray-600">Get up and running in minutes</p>
        </div>
        
        <QuickStartGuide />
      </motion.section>
      {{/if}}

      {/* Footer */}
      {{#if feature.parameters.showArchitechBranding}}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="py-8 border-t border-gray-200"
      >
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Generated with ❤️ by{' '}
            <a 
              href="https://architech.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              The Architech
            </a>
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <a href="https://docs.architech.xyz" className="hover:text-gray-700">Documentation</a>
            <a href="https://github.com/architech-xyz" className="hover:text-gray-700">GitHub</a>
            <a href="https://discord.gg/architech" className="hover:text-gray-700">Discord</a>
          </div>
        </div>
      </motion.footer>
      {{/if}}
    </WelcomeLayout>
  );
}
