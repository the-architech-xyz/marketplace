# Enhanced Marketplace Manifest v2.0 - Usage Guide

## 🎯 Overview

The enhanced marketplace manifest provides comprehensive metadata about all modules, genomes, categories, and tags available in The Architech marketplace. This enables rich landing pages, documentation, and tooling integrations.

## 📊 Structure

```typescript
interface EnhancedMarketplaceManifest {
  version: '2.0.0';
  generatedAt: string; // ISO timestamp
  
  stats: {
    totalModules: number;
    adapters: number;
    connectors: number;
    features: number;
    genomes: number;
    lastUpdated: string;
  };
  
  modules: {
    adapters: ModuleEntry[];
    connectors: ModuleEntry[];
    features: ModuleEntry[];
  };
  
  genomes: GenomeEntry[];
  categories: CategoryInfo[];
  tags: string[];
}
```

## 🔍 Key Features

### ✅ What's Now Available

| Feature | Description | Use Case |
|---------|-------------|----------|
| **Grouped Modules** | Modules organized by type (adapters/connectors/features) | Easy filtering and display |
| **Rich Metadata** | Name, description, version, parameters | Module cards and documentation |
| **Relationships** | `requires`, `provides`, `connects` arrays | Dependency visualization |
| **Categories** | Module grouping by function (database, auth, etc.) | Category browsing |
| **Genome Metadata** | Complexity, stack, use case, module counts | Genome browser |
| **Tags** | Comprehensive tag system | Search and filtering |
| **Complexity Levels** | simple/intermediate/advanced classification | User guidance |

### 📦 Module Entry Structure

```typescript
{
  "id": "framework/nextjs",
  "name": "Next.js",
  "description": "The React Framework for Production",
  "category": "framework",
  "type": "adapter",
  "version": "15.0.0",
  "blueprint": "adapters/framework/nextjs/blueprint.ts",
  "jsonFile": "adapters/framework/nextjs/adapter.json",
  
  // Relationships
  "provides": ["react", "nextjs", "typescript", "tailwind"],
  "requires": [],
  
  // Metadata
  "tags": ["react", "ssr", "framework"],
  "complexity": "intermediate",
  
  // Parameters (configurable options)
  "parameters": {
    "typescript": {
      "type": "boolean",
      "default": true,
      "description": "Enable TypeScript support"
    }
    // ... more parameters
  }
}
```

### 🧬 Genome Entry Structure

```typescript
{
  "id": "hello-world",
  "name": "Hello World Starter",
  "description": "The most minimal, production-ready Next.js application",
  "path": "genomes/official/01-hello-world.genome.ts",
  
  // Rich metadata extracted from JSDoc
  "stack": "Next.js + TypeScript + Tailwind + Shadcn UI",
  "useCase": "First-time users, prototypes, simple landing pages",
  "pattern": "Minimal complexity, maximum clarity",
  
  // Categorization
  "complexity": "simple",
  "estimatedTime": "5 minutes",
  "tags": ["nextjs", "minimal", "beginner"],
  
  // Module breakdown
  "modules": {
    "adapters": ["framework/nextjs", "ui/shadcn-ui"],
    "connectors": [],
    "features": ["features/architech-welcome/shadcn"]
  },
  "moduleCount": 3,
  
  // Alternative names for CLI
  "aliases": ["hello-world", "minimal", "01"]
}
```

### 📂 Category Structure

```typescript
{
  "id": "framework",
  "name": "Frameworks",
  "description": "Core application frameworks",
  "icon": "🏗️",
  "moduleCount": 4,
  "modules": ["framework/nextjs", "framework/expo", /* ... */]
}
```

## 🚀 Usage Examples

### 1. Display Module Cards on Landing Page

```typescript
// Fetch the manifest
const manifest = await fetch('https://unpkg.com/@thearchitech.xyz/marketplace/manifest.json')
  .then(res => res.json());

// Show adapters grouped by category
const adaptersByCategory = {};
manifest.modules.adapters.forEach(adapter => {
  if (!adaptersByCategory[adapter.category]) {
    adaptersByCategory[adapter.category] = [];
  }
  adaptersByCategory[adapter.category].push(adapter);
});

// Render
Object.entries(adaptersByCategory).forEach(([category, adapters]) => {
  const categoryInfo = manifest.categories.find(c => c.id === category);
  console.log(`${categoryInfo.icon} ${categoryInfo.name}`);
  adapters.forEach(adapter => {
    console.log(`  - ${adapter.name}: ${adapter.description}`);
  });
});
```

### 2. Genome Browser

```typescript
// Filter genomes by complexity
const beginnerGenomes = manifest.genomes.filter(g => g.complexity === 'simple');
const advancedGenomes = manifest.genomes.filter(g => g.complexity === 'advanced');

// Search genomes by tags
const authGenomes = manifest.genomes.filter(g => 
  g.tags.includes('auth') || g.modules.features.some(f => f.includes('auth'))
);

// Display genome cards
beginnerGenomes.forEach(genome => {
  console.log(`
    ${genome.name}
    ${genome.description}
    
    Stack: ${genome.stack}
    Complexity: ${genome.complexity}
    Estimated Time: ${genome.estimatedTime}
    Modules: ${genome.moduleCount}
  `);
});
```

### 3. Module Dependency Visualization

```typescript
// Build dependency graph
const dependencyGraph = {};
manifest.modules.connectors.forEach(connector => {
  dependencyGraph[connector.id] = {
    requires: connector.requires || [],
    connects: connector.connects || [],
    provides: connector.provides || []
  };
});

// Find all modules that depend on Next.js
const nextjsDependents = Object.entries(dependencyGraph)
  .filter(([id, deps]) => deps.requires.includes('framework/nextjs'))
  .map(([id]) => id);
```

### 4. Stats Dashboard

```typescript
const { stats } = manifest;

console.log(`
  📊 Marketplace Stats
  ==================
  Total Modules: ${stats.totalModules}
  
  By Type:
  - Adapters: ${stats.adapters}
  - Connectors: ${stats.connectors}
  - Features: ${stats.features}
  - Genomes: ${stats.genomes}
  
  Categories: ${manifest.categories.length}
  Tags: ${manifest.tags.length}
  
  Last Updated: ${new Date(stats.lastUpdated).toLocaleString()}
`);
```

### 5. Search & Filter

```typescript
// Search modules by name or description
function searchModules(query) {
  const allModules = [
    ...manifest.modules.adapters,
    ...manifest.modules.connectors,
    ...manifest.modules.features
  ];
  
  return allModules.filter(module => 
    module.name.toLowerCase().includes(query.toLowerCase()) ||
    module.description.toLowerCase().includes(query.toLowerCase()) ||
    module.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
}

// Filter by category
function filterByCategory(categoryId) {
  return manifest.categories.find(c => c.id === categoryId).modules;
}

// Get modules by tag
function getModulesByTag(tag) {
  const allModules = [
    ...manifest.modules.adapters,
    ...manifest.modules.connectors,
    ...manifest.modules.features
  ];
  
  return allModules.filter(module => module.tags?.includes(tag));
}
```

## 🎨 UI Component Ideas

### Module Card Component

```tsx
interface ModuleCardProps {
  module: ModuleEntry;
}

function ModuleCard({ module }: ModuleCardProps) {
  const category = categories.find(c => c.id === module.category);
  
  return (
    <div className="module-card">
      <div className="module-header">
        <span className="category-icon">{category.icon}</span>
        <h3>{module.name}</h3>
        <span className="complexity-badge">{module.complexity}</span>
      </div>
      
      <p>{module.description}</p>
      
      {module.tags && (
        <div className="tags">
          {module.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
      
      {module.provides && (
        <div className="provides">
          Provides: {module.provides.join(', ')}
        </div>
      )}
    </div>
  );
}
```

### Genome Browser Component

```tsx
function GenomeBrowser() {
  const [complexity, setComplexity] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredGenomes = manifest.genomes.filter(genome => {
    const matchesComplexity = complexity === 'all' || genome.complexity === complexity;
    const matchesSearch = genome.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         genome.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesComplexity && matchesSearch;
  });
  
  return (
    <div>
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search genomes..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        
        <select value={complexity} onChange={e => setComplexity(e.target.value)}>
          <option value="all">All Levels</option>
          <option value="simple">Simple</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      
      <div className="genome-grid">
        {filteredGenomes.map(genome => (
          <GenomeCard key={genome.id} genome={genome} />
        ))}
      </div>
    </div>
  );
}
```

## 📡 API Endpoints (Future)

When published to NPM, the manifest will be available at:

```
https://unpkg.com/@thearchitech.xyz/marketplace/manifest.json
```

You can also access specific versions:

```
https://unpkg.com/@thearchitech.xyz/marketplace@1.10.0/manifest.json
https://unpkg.com/@thearchitech.xyz/marketplace@latest/manifest.json
```

## 🔄 Regeneration

The manifest is automatically regenerated:
- On every marketplace commit (via pre-commit hook)
- When running `npm run generate:manifest`
- During the build process (`npm run build`)

## 📝 Notes

### Current Limitations

1. **No Community Metrics** (yet)
   - Downloads, stars, ratings require backend
   - Coming in future versions

2. **No Screenshots/Media**
   - Visual previews not included
   - Consider hosting separately

3. **Static Complexity Calculation**
   - Based on module count heuristics
   - May need manual tuning for accuracy

### Future Enhancements

- [ ] Add download counts from NPM registry
- [ ] Include GitHub stars for modules
- [ ] Add community ratings/reviews
- [ ] Generate OpenAPI spec from manifest
- [ ] Add usage examples/code snippets
- [ ] Include screenshot URLs
- [ ] Add "featured" modules flag
- [ ] Include changelog/release notes

## 🤝 Contributing

To enhance the manifest:

1. Update `scripts/generation/generate-marketplace-manifest.ts`
2. Run `npm run generate:manifest` to test
3. Check the output in `manifest.json`
4. Update this guide if structure changes

## 📚 Related Documentation

- [Marketplace Architecture](./docs/ARCHITECTURE.md)
- [Module Development Guide](./docs/ADAPTER_DEVELOPMENT_GUIDE.md)
- [Genome Authoring Guide](./docs/AUTHORING_GUIDE.md)
- [Constitutional Architecture](./docs/CONSTITUTIONAL_ARCHITECTURE.md)

