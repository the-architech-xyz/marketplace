# Template Context Variables Guide

## Overview

This guide defines the standardized variables available in EJS templates across all Architech modules. All template context variables have been migrated from `context.xxx` to `module.parameters.xxx` for consistency.

## Available Context Variables

### Project Information
```ejs
<%= project.name %>           <!-- Project name -->
<%= project.framework %>      <!-- Framework (e.g., 'nextjs') -->
<%= project.description %>    <!-- Project description -->
<%= project.version %>        <!-- Project version -->
<%= project.author %>         <!-- Project author -->
<%= project.license %>        <!-- Project license -->
```

### Module Information
```ejs
<%= module.id %>                    <!-- Module ID (e.g., 'ui/shadcn-ui') -->
<%= module.parameters.devtools %>   <!-- Module-specific parameters -->
<%= module.parameters.suspense %>   <!-- Boolean parameters -->
<%= module.parameters.defaultOptions.queries.staleTime %> <!-- Nested parameters -->
```

### Framework Information
```ejs
<%= framework %>  <!-- Framework name (e.g., 'nextjs') -->
```

### Path Resolution
```ejs
<%= paths.app_root %>        <!-- App root directory -->
<%= paths.components %>      <!-- Components directory -->
<%= paths.shared_library %>  <!-- Shared library directory -->
<%= paths.styles %>          <!-- Styles directory -->
<%= paths.scripts %>         <!-- Scripts directory -->
<%= paths.hooks %>           <!-- Hooks directory -->
```

### Cross-Module Access
```ejs
<%= modules['ui/shadcn-ui'] %>           <!-- Access other modules -->
<%= databaseModule %>                    <!-- Database module -->
<%= paymentModule %>                     <!-- Payment module -->
<%= authModule %>                        <!-- Auth module -->
<%= emailModule %>                       <!-- Email module -->
<%= observabilityModule %>               <!-- Observability module -->
<%= stateModule %>                       <!-- State module -->
<%= uiModule %>                          <!-- UI module -->
<%= testingModule %>                     <!-- Testing module -->
<%= deploymentModule %>                  <!-- Deployment module -->
<%= contentModule %>                     <!-- Content module -->
<%= blockchainModule %>                  <!-- Blockchain module -->
```

## Standardized Module Parameters

### UI Module Parameters
```ejs
<%= module.parameters.hasTypography %>     <!-- Enable typography plugin -->
<%= module.parameters.hasForms %>          <!-- Enable forms plugin -->
<%= module.parameters.hasAspectRatio %>    <!-- Enable aspect ratio plugin -->
<%= module.parameters.hasDarkMode %>       <!-- Enable dark mode -->
```

### Quality Module Parameters
```ejs
<%= module.parameters.hasTypeScript %>     <!-- Enable TypeScript support -->
<%= module.parameters.hasReact %>          <!-- Enable React support -->
<%= module.parameters.hasNextJS %>         <!-- Enable Next.js support -->
<%= module.parameters.hasAccessibility %>  <!-- Enable accessibility rules -->
<%= module.parameters.hasImports %>        <!-- Enable import rules -->
<%= module.parameters.hasFormat %>         <!-- Enable formatting rules -->
```

### State Module Parameters
```ejs
<%= module.parameters.hasImmer %>          <!-- Enable Immer for state updates -->
```

### AI Module Parameters
```ejs
<%= module.parameters.defaultModel %>      <!-- Default AI model -->
<%= module.parameters.maxTokens %>         <!-- Maximum tokens -->
<%= module.parameters.temperature %>       <!-- Temperature setting -->
<%= module.parameters.hasStreaming %>      <!-- Enable streaming -->
<%= module.parameters.hasChat %>           <!-- Enable chat features -->
<%= module.parameters.hasTextGeneration %> <!-- Enable text generation -->
<%= module.parameters.hasImageGeneration %> <!-- Enable image generation -->
<%= module.parameters.hasEmbeddings %>     <!-- Enable embeddings -->
<%= module.parameters.hasFunctionCalling %> <!-- Enable function calling -->
```

### Form Module Parameters
```ejs
<%= module.parameters.hasAdvancedValidation %> <!-- Enable advanced validation -->
```

### Email Module Parameters
```ejs
<%= module.parameters.hasOrganizations %>  <!-- Enable organization support -->
<%= module.parameters.hasTeams %>          <!-- Enable team support -->
<%= module.parameters.hasTemplates %>      <!-- Enable email templates -->
<%= module.parameters.hasBulkEmail %>      <!-- Enable bulk email -->
<%= module.parameters.hasAnalytics %>      <!-- Enable email analytics -->
```

### Payment Module Parameters
```ejs
<%= module.parameters.currency %>          <!-- Payment currency -->
```

### Welcome Page Parameters
```ejs
<%= module.parameters.customTitle %>       <!-- Custom page title -->
<%= module.parameters.customDescription %> <!-- Custom page description -->
<%= module.parameters.showTechStack %>     <!-- Show technology stack -->
<%= module.parameters.showComponents %>    <!-- Show component showcase -->
<%= module.parameters.showProjectStructure %> <!-- Show project structure -->
<%= module.parameters.showQuickStart %>    <!-- Show quick start guide -->
<%= module.parameters.showArchitechBranding %> <!-- Show Architech branding -->
```

## Function Parameters & API Context

### Function Parameters (Keep as context.)
These are function parameters from libraries like TanStack Query and should remain as `context.`:

```ejs
// TanStack Query mutation context
onError: (error, variables, context) => {
  if (context?.previousData && context?.queryKey) {
    queryClient.setQueryData(context.queryKey, context.previousData);
  }
}

// Team permissions context
canSendTeamEmail(context: TeamEmailContext): { allowed: boolean; reason?: string } {
  if (!context.teamRole) {
    return { allowed: false, reason: 'User is not a member of this team' };
  }
}
```

### API Context Variables (Keep as context.)
These represent API request/response context and should remain as `context.`:

```ejs
<%= context.request %>        <!-- API request object -->
<%= context.response %>       <!-- API response object -->
<%= context.session %>        <!-- User session -->
<%= context.user %>           <!-- User object -->
<%= context.organization %>   <!-- Organization object -->
```

## Common Patterns

### Conditional Rendering
```ejs
<% if (module.parameters.devtools) { %>
  <ReactQueryDevtools initialIsOpen={false} />
<% } %>
```

### Parameter Access with Fallbacks
```ejs
<%= module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.staleTime || '300000' %>
```

### Loop Through Arrays
```ejs
<% module.parameters.components.forEach((component) => { %>
  <Component name="<%= component %>" />
<% }); %>
```

### Cross-Module Dependencies
```ejs
<% if (uiModule && uiModule.parameters.components.includes('button')) { %>
  import { Button } from '@/components/ui/button';
<% } %>
```

## Migration Status

### ✅ Completed Migration
All template context variables have been successfully migrated from `context.xxx` to `module.parameters.xxx`. The migration covered 46 variables across 9 template files.

### ❌ Deprecated (Don't Use)
```ejs
<%= context.devtools %>
<%= context.hasCustomStaleTime %>
<%= context.staleTime %>
<%= context.suspense %>
<%= context.customTitle %>
<%= context.hasAdvancedValidation %>
```

### ✅ Standardized (Use These)
```ejs
<%= module.parameters.devtools %>
<%= module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.staleTime %>
<%= module.parameters.defaultOptions.queries.staleTime %>
<%= module.parameters.suspense %>
<%= module.parameters.customTitle %>
<%= module.parameters.hasAdvancedValidation %>
```

### 🔒 Preserved (Keep as context.)
```ejs
<%= context.previousData %>    <!-- Function parameter -->
<%= context.queryKey %>        <!-- Function parameter -->
<%= context.teamRole %>        <!-- Function parameter -->
<%= context.request %>         <!-- API context -->
<%= context.session %>         <!-- API context -->
```

## Best Practices

1. **Always use `module.parameters`** for module-specific configuration
2. **Use `project`** for project-level information
3. **Use `framework`** for framework-specific logic
4. **Use `paths`** for file path resolution
5. **Use cross-module variables** for dependencies between modules
6. **Provide fallbacks** for optional parameters
7. **Use conditional rendering** for optional features

## Examples

### TanStack Query Configuration
```ejs
// query-client.ts.tpl
const defaultQueryOptions = {
  queries: {
    staleTime: <% if (module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.staleTime) { %><%= module.parameters.defaultOptions.queries.staleTime %><% } else { %>300000<% } %>,
    gcTime: <% if (module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.gcTime) { %><%= module.parameters.defaultOptions.queries.gcTime %><% } else { %>600000<% } %>,
    retry: <% if (module.parameters.defaultOptions && module.parameters.defaultOptions.queries && module.parameters.defaultOptions.queries.retry) { %><%= module.parameters.defaultOptions.queries.retry %><% } else { %>3<% } %>,
  }
};
```

### Shadcn UI Component Installation
```ejs
// blueprint.ts
{
  type: BlueprintActionType.RUN_COMMAND,
  command: 'npx shadcn@latest add <%= item %> --yes --overwrite',
  forEach: 'module.parameters.components',
  workingDir: '.'
}
```

### Conditional Feature Rendering
```ejs
// QueryProvider.tsx.tpl
<% if (module.parameters.devtools) { %>
  <ReactQueryDevtools 
    initialIsOpen={false}
    position="bottom-right"
  />
<% } %>
```

## Troubleshooting

### Common Issues

1. **`context is not defined`** - Use `module.parameters` instead of `context`
2. **`module.parameters is undefined`** - Check if the parameter exists before accessing
3. **Path resolution errors** - Use `paths.xxx` variables for file paths
4. **Cross-module access fails** - Ensure the module is loaded and available

### Debug Template Context
```ejs
<!-- Add this to any template for debugging -->
<pre>
Project: <%= JSON.stringify(project, null, 2) %>
Module: <%= JSON.stringify(module, null, 2) %>
Framework: <%= framework %>
Available paths: <%= JSON.stringify(paths, null, 2) %>
</pre>
```
