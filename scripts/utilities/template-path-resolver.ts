/**
 * Template Path Resolver
 * 
 * Resolves template variables in file paths to actual paths
 */

export class TemplatePathResolver {
  private frameworkPaths: Map<string, string> = new Map([
    ['auth_config', 'src/lib/auth'],
    ['payment_config', 'src/lib/payment'],
    ['db_config', 'src/lib/db'],
    ['ui_config', 'src/components/ui'],
    ['state_config', 'src/lib/state'],
    ['observability_config', 'src/lib/observability'],
    ['blockchain_config', 'src/lib/blockchain'],
    ['deployment_config', 'deployment'],
    ['email_config', 'src/lib/email'],
    // Framework adapter paths
    ['source_root', 'src/'],
    ['app_root', 'src/app/'],
    ['pages_root', 'src/pages/'],
    ['shared_library', 'src/lib/'],
    ['utils', 'src/lib/utils/'],
    ['types', 'src/types/'],
    ['hooks', 'src/hooks/'],
    ['stores', 'src/stores/'],
    ['components', 'src/components/'],
    ['ui_components', 'src/components/ui/'],
    ['styles', 'src/styles/'],
    ['scripts', 'scripts/']
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
    
    // Replace {{paths.*}} variables
    resolved = resolved.replace(/\{\{paths\.(\w+)\}\}/g, (match, pathKey) => {
      return this.frameworkPaths.get(pathKey) || match;
    });
    
    // Replace {{project.*}} variables
    resolved = resolved.replace(/\{\{project\.(\w+)\}\}/g, (match, projectKey) => {
      return parameters[projectKey] || this.projectPaths.get(projectKey) || match;
    });
    
    // Replace {{integration.features.*}} variables
    resolved = resolved.replace(/\{\{integration\.features\.(\w+)\}\}/g, (match, featureKey) => {
      const featureValue = parameters.features?.[featureKey];
      return featureValue ? 'true' : 'false';
    });
    
    // Replace {{env.*}} variables
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
