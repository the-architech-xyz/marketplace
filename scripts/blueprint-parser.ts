/**
 * Blueprint Parser
 * 
 * Statically analyzes blueprint.ts files to extract file artifacts
 * using the TypeScript Compiler API
 */

import * as ts from 'typescript';
import * as path from 'path';
import * as fs from 'fs';
import { FileArtifact, PackageArtifact, EnvVarArtifact, ModuleArtifacts, BlueprintAnalysisResult } from '@thearchitech.xyz/types';

export class BlueprintParser {
  private program: ts.Program;
  private checker: ts.TypeChecker;
  private sourceFiles: Map<string, ts.SourceFile> = new Map();

  constructor(projectRoot: string) {
    const configPath = ts.findConfigFile(projectRoot, ts.sys.fileExists, 'tsconfig.json');
    if (!configPath) {
      throw new Error('No tsconfig.json found in project root');
    }

    const config = ts.readConfigFile(configPath, ts.sys.readFile);
    const parsedConfig = ts.parseJsonConfigFileContent(
      config.config,
      ts.sys,
      path.dirname(configPath)
    );

    this.program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);
    this.checker = this.program.getTypeChecker();
  }

  /**
   * Parse a single blueprint file and extract artifacts
   */
  parseBlueprint(blueprintPath: string, moduleId: string, moduleType: 'adapter' | 'integration'): BlueprintAnalysisResult {
    try {
      const sourceFile = this.program.getSourceFile(blueprintPath);
      if (!sourceFile) {
        throw new Error(`Blueprint file not found: ${blueprintPath}`);
      }

      const artifacts = this.extractArtifacts(sourceFile);
      
      return {
        moduleId,
        moduleType,
        artifacts,
        metadata: {
          analyzedAt: new Date().toISOString(),
          blueprintPath,
          success: true
        }
      };
    } catch (error) {
      return {
        moduleId,
        moduleType,
        artifacts: {
          creates: [],
          enhances: [],
          installs: [],
          envVars: []
        },
        metadata: {
          analyzedAt: new Date().toISOString(),
          blueprintPath,
          success: false,
          errors: [error instanceof Error ? error.message : String(error)]
        }
      };
    }
  }

  /**
   * Parse all blueprint files in the marketplace
   */
  parseAllBlueprints(marketplacePath: string): BlueprintAnalysisResult[] {
    const results: BlueprintAnalysisResult[] = [];
    
    // Find all blueprint.ts files
    const blueprintFiles = this.findBlueprintFiles(marketplacePath);
    
    for (const blueprintFile of blueprintFiles) {
      const moduleId = this.extractModuleIdFromPath(blueprintFile, marketplacePath);
      const moduleType = this.determineModuleType(blueprintFile, marketplacePath);
      
      const result = this.parseBlueprint(blueprintFile, moduleId, moduleType);
      results.push(result);
    }
    
    return results;
  }

  /**
   * Extract artifacts from a TypeScript source file
   */
  private extractArtifacts(sourceFile: ts.SourceFile): ModuleArtifacts {
    const artifacts: ModuleArtifacts = {
      creates: [],
      enhances: [],
      installs: [],
      envVars: []
    };

    // Find the blueprint export
    const blueprintExport = this.findBlueprintExport(sourceFile);
    if (!blueprintExport) {
      return artifacts;
    }

    // Extract actions from the blueprint
    const actions = this.extractActions(blueprintExport);
    
    // Process each action
    for (const action of actions) {
      this.processAction(action, artifacts, sourceFile);
    }

    return artifacts;
  }

  /**
   * Find the blueprint export in the source file
   */
  private findBlueprintExport(sourceFile: ts.SourceFile): ts.ObjectLiteralExpression | null {
    let blueprintExport: ts.ObjectLiteralExpression | null = null;

    const visitNode = (node: ts.Node): void => {
      // Look for export const blueprint = ... or export const *Blueprint = ...
      if (ts.isVariableStatement(node)) {
        const declaration = node.declarationList.declarations[0];
        if (declaration && 
            ts.isIdentifier(declaration.name) && 
            (declaration.name.text === 'blueprint' || declaration.name.text.endsWith('Blueprint')) &&
            declaration.initializer &&
            ts.isObjectLiteralExpression(declaration.initializer)) {
          blueprintExport = declaration.initializer;
          return;
        }
      }

      // Look for export { blueprint } or export { *Blueprint }
      if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
        const namedExports = node.exportClause.elements;
        for (const exportSpecifier of namedExports) {
          if (exportSpecifier.name.text === 'blueprint' || exportSpecifier.name.text.endsWith('Blueprint')) {
            // This is a re-export, we need to find the actual declaration
            // For now, we'll skip re-exports
            return;
          }
        }
      }

      // Recursively visit child nodes
      ts.forEachChild(node, visitNode);
    };

    visitNode(sourceFile);
    return blueprintExport;
  }

  /**
   * Extract actions array from blueprint object
   */
  private extractActions(blueprint: ts.ObjectLiteralExpression): ts.ObjectLiteralExpression[] {
    const actions: ts.ObjectLiteralExpression[] = [];

    for (const property of blueprint.properties) {
      if (ts.isPropertyAssignment(property) && 
          ts.isIdentifier(property.name) && 
          property.name.text === 'actions' &&
          ts.isArrayLiteralExpression(property.initializer)) {
        
        for (const element of property.initializer.elements) {
          if (ts.isObjectLiteralExpression(element)) {
            actions.push(element);
          }
        }
        break;
      }
    }

    return actions;
  }

  /**
   * Process a single action and extract relevant information
   */
  private processAction(action: ts.ObjectLiteralExpression, artifacts: ModuleArtifacts, sourceFile: ts.SourceFile): void {
    const actionType = this.getPropertyValue(action, 'type', sourceFile);
    if (!actionType) return;

    switch (actionType) {
      case 'CREATE_FILE':
        this.processCreateFileAction(action, artifacts, sourceFile);
        break;
      case 'ENHANCE_FILE':
        this.processEnhanceFileAction(action, artifacts, sourceFile);
        break;
      case 'INSTALL_PACKAGES':
        this.processInstallPackagesAction(action, artifacts, sourceFile);
        break;
      case 'ADD_ENV_VAR':
        this.processAddEnvVarAction(action, artifacts, sourceFile);
        break;
    }
  }

  /**
   * Process CREATE_FILE action
   */
  private processCreateFileAction(action: ts.ObjectLiteralExpression, artifacts: ModuleArtifacts, sourceFile: ts.SourceFile): void {
    const path = this.getPropertyValue(action, 'path', sourceFile);
    const condition = this.getPropertyValue(action, 'condition', sourceFile);
    const template = this.getPropertyValue(action, 'template', sourceFile);
    const description = this.getPropertyValue(action, 'description', sourceFile);

    if (path) {
      artifacts.creates.push({
        path,
        condition,
        template,
        required: true,
        description
      });
    }
  }

  /**
   * Process ENHANCE_FILE action
   */
  private processEnhanceFileAction(action: ts.ObjectLiteralExpression, artifacts: ModuleArtifacts, sourceFile: ts.SourceFile): void {
    const path = this.getPropertyValue(action, 'path', sourceFile);
    const condition = this.getPropertyValue(action, 'condition', sourceFile);
    const modifier = this.getPropertyValue(action, 'modifier', sourceFile);
    const description = this.getPropertyValue(action, 'description', sourceFile);
    const owner = this.getPropertyValue(action, 'owner', sourceFile);

    if (path) {
      artifacts.enhances.push({
        path,
        condition,
        modifier,
        required: true,
        description,
        owner
      });
    }
  }

  /**
   * Process INSTALL_PACKAGES action
   */
  private processInstallPackagesAction(action: ts.ObjectLiteralExpression, artifacts: ModuleArtifacts, sourceFile: ts.SourceFile): void {
    const packages = this.getPropertyValue(action, 'packages', sourceFile);
    const isDev = this.getPropertyBoolean(action, 'isDev') || false;

    if (packages) {
      // Handle both string and array formats
      const packageList = packages.startsWith('[') 
        ? this.parseArrayString(packages)
        : packages.split(',').map(p => p.trim());

      artifacts.installs.push({
        packages: packageList,
        isDev
      });
    } else {
      // Try to get packages as an array literal
      const packagesArray = this.getPropertyArray(action, 'packages', sourceFile);
      if (packagesArray && packagesArray.length > 0) {
        artifacts.installs.push({
          packages: packagesArray,
          isDev
        });
      }
    }
  }

  /**
   * Process ADD_ENV_VAR action
   */
  private processAddEnvVarAction(action: ts.ObjectLiteralExpression, artifacts: ModuleArtifacts, sourceFile: ts.SourceFile): void {
    const key = this.getPropertyValue(action, 'key', sourceFile);
    const value = this.getPropertyValue(action, 'value', sourceFile);
    const description = this.getPropertyValue(action, 'description', sourceFile);

    if (key && value !== undefined) {
      artifacts.envVars.push({
        key,
        value,
        description
      });
    }
  }

  /**
   * Get property value from object literal expression
   */
  private getPropertyValue(obj: ts.ObjectLiteralExpression, propertyName: string, sourceFile?: ts.SourceFile): string | undefined {
    for (const property of obj.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = this.getPropertyName(property.name);
        if (name === propertyName) {
          return this.extractStringValue(property.initializer, sourceFile);
        }
      }
    }
    return undefined;
  }

  /**
   * Get property array from object literal expression
   */
  private getPropertyArray(obj: ts.ObjectLiteralExpression, propertyName: string, sourceFile?: ts.SourceFile): string[] {
    for (const property of obj.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = this.getPropertyName(property.name);
        if (name === propertyName && ts.isArrayLiteralExpression(property.initializer)) {
          return property.initializer.elements
            .map(element => this.extractStringValue(element, sourceFile))
            .filter((value): value is string => value !== undefined);
        }
      }
    }
    return [];
  }

  /**
   * Get boolean property value from object literal expression
   */
  private getPropertyBoolean(obj: ts.ObjectLiteralExpression, propertyName: string): boolean | undefined {
    for (const property of obj.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = this.getPropertyName(property.name);
        if (name === propertyName) {
          return this.extractBooleanValue(property.initializer);
        }
      }
    }
    return undefined;
  }

  /**
   * Get property name from property name node
   */
  private getPropertyName(nameNode: ts.PropertyName): string {
    if (ts.isIdentifier(nameNode)) {
      return nameNode.text;
    } else if (ts.isStringLiteral(nameNode)) {
      return nameNode.text;
    }
    return '';
  }

  /**
   * Extract string value from expression
   */
  private extractStringValue(expression: ts.Expression, sourceFile?: ts.SourceFile): string | undefined {
    if (ts.isStringLiteral(expression)) {
      return expression.text;
    } else if (ts.isTemplateExpression(expression)) {
      // For template literals, we'll return the raw text for now
      // In a more sophisticated implementation, we'd resolve template variables
      return sourceFile ? expression.getText(sourceFile) : expression.getText();
    }
    return undefined;
  }

  /**
   * Extract boolean value from expression
   */
  private extractBooleanValue(expression: ts.Expression): boolean | undefined {
    if (expression.kind === ts.SyntaxKind.TrueKeyword) {
      return true;
    } else if (expression.kind === ts.SyntaxKind.FalseKeyword) {
      return false;
    }
    return undefined;
  }

  /**
   * Parse array string like "['pkg1', 'pkg2']"
   */
  private parseArrayString(arrayStr: string): string[] {
    try {
      // Simple parsing - in a real implementation, we'd use a proper parser
      const matches = arrayStr.match(/'([^']+)'/g);
      return matches ? matches.map(m => m.slice(1, -1)) : [];
    } catch {
      return [];
    }
  }

  /**
   * Find all blueprint.ts files in the marketplace
   */
  private findBlueprintFiles(marketplacePath: string): string[] {
    const blueprintFiles: string[] = [];
    
    const findFiles = (dir: string): void => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          findFiles(fullPath);
        } else if (entry.isFile() && entry.name === 'blueprint.ts') {
          blueprintFiles.push(fullPath);
        }
      }
    };
    
    findFiles(marketplacePath);
    return blueprintFiles;
  }

  /**
   * Extract module ID from file path
   */
  private extractModuleIdFromPath(blueprintPath: string, marketplacePath: string): string {
    const relativePath = path.relative(marketplacePath, blueprintPath);
    const pathParts = relativePath.split(path.sep);
    
    // Remove 'blueprint.ts' and get the module path
    const modulePath = pathParts.slice(0, -1);
    
    // Remove 'adapters' or 'integrations' prefix if present
    if (modulePath[0] === 'adapters' || modulePath[0] === 'integrations') {
      modulePath.shift();
    }
    
    // Convert to module ID format
    return modulePath.join('/');
  }

  /**
   * Determine module type from file path
   */
  private determineModuleType(blueprintPath: string, marketplacePath: string): 'adapter' | 'integration' {
    const relativePath = path.relative(marketplacePath, blueprintPath);
    const isAdapter = relativePath.startsWith('adapters/') || relativePath.includes('/adapters/');
    return isAdapter ? 'adapter' : 'integration';
  }
}
