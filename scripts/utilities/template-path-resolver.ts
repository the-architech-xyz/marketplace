/**
 * Template Path Resolver
 * 
 * Resolves template variables in file paths to actual paths
 */

export class TemplatePathResolver {
  private frameworkPaths: Map<string, string> = new Map([
    ['workspace.root', './'],
    ['workspace.scripts', 'scripts/'],
    ['workspace.docs', 'docs/'],
    ['workspace.env', '.env'],
    ['workspace.config', 'config/'],

    ['apps.web.root', 'apps/web/'],
    ['apps.web.src', 'apps/web/src/'],
    ['apps.web.app', 'apps/web/src/app/'],
    ['apps.web.components', 'apps/web/src/components/'],
    ['apps.web.public', 'apps/web/public/'],
    ['apps.web.middleware', 'apps/web/src/middleware/'],
    ['apps.web.server', 'apps/web/src/server/'],
    ['apps.web.collections', 'apps/web/src/collections/'],

    ['apps.api.root', 'apps/api/'],
    ['apps.api.src', 'apps/api/src/'],
    ['apps.api.routes', 'apps/api/src/routes/'],

    ['packages.shared.root', 'packages/shared/'],
    ['packages.shared.src', 'packages/shared/src/'],
    ['packages.shared.src.components', 'packages/shared/src/components/'],
    ['packages.shared.src.hooks', 'packages/shared/src/hooks/'],
    ['packages.shared.src.providers', 'packages/shared/src/providers/'],
    ['packages.shared.src.stores', 'packages/shared/src/stores/'],
    ['packages.shared.src.types', 'packages/shared/src/types/'],
    ['packages.shared.src.utils', 'packages/shared/src/utils/'],
    ['packages.shared.src.scripts', 'packages/shared/src/scripts/'],
    ['packages.shared.src.routes', 'packages/shared/src/routes/'],
    ['packages.shared.src.jobs', 'packages/shared/src/jobs/'],

    ['packages.database.root', 'packages/database/'],
    ['packages.database.src', 'packages/database/src/'],

    ['packages.ui.root', 'packages/ui/'],
    ['packages.ui.src', 'packages/ui/src/']
  ]);

  private projectPaths: Map<string, string> = new Map([
    ['name', 'my-project'],
    ['version', '1.0.0'],
    ['description', 'My Architech Project']
  ]);

  /**
   * Resolve template variables in a file path
   */
  resolvePath(templatePath: string, parameters: Record<string, any> = {}): string {
    let resolved = templatePath;
    
    // Replace path tokens (e.g. paths.someKey)
    resolved = resolved.replace(/\{\{paths\.([^}]+)\}\}/g, (match, pathKey) => {
      return this.frameworkPaths.get(pathKey) || match;
    });
    
    // Replace ${project.*} variables
    resolved = resolved.replace(/\{\{project\.(\w+)\}\}/g, (match, projectKey) => {
      return parameters[projectKey] || this.projectPaths.get(projectKey) || match;
    });
    
    // Replace ${integration.features.*} variables
    resolved = resolved.replace(/\{\{integration\.features\.(\w+)\}\}/g, (match, featureKey) => {
      const featureValue = parameters.features?.[featureKey];
      return featureValue ? 'true' : 'false';
    });
    
    // Replace ${env.*} variables
    resolved = resolved.replace(/\{\{env\.(\w+)\}\}/g, (match, envKey) => {
      return process.env[envKey] || match;
    });
    
    return resolved;
  }

  /**
   * Resolve multiple paths at once
   */
  resolvePaths(templatePaths: string[], parameters: Record<string, any> = {}): string[] {
    return templatePaths.map(path => this.resolvePath(path, parameters));
  }

  /**
   * Add custom path mappings
   */
  addPathMapping(key: string, value: string): void {
    this.frameworkPaths.set(key, value);
  }

  /**
   * Add custom project mappings
   */
  addProjectMapping(key: string, value: string): void {
    this.projectPaths.set(key, value);
  }

  /**
   * Get all available path mappings
   */
  getPathMappings(): Map<string, string> {
    return new Map(this.frameworkPaths);
  }

  /**
   * Get all available project mappings
   */
  getProjectMappings(): Map<string, string> {
    return new Map(this.projectPaths);
  }
}
