/**
 * Blueprint Configuration Types - Runtime Implementation
 */

export function extractTypedModuleParameters(config) {
  // CRITICAL FIX: Extract from MergedConfiguration.templateContext structure
  // The config passed to blueprints has parameters nested in templateContext.module.parameters
  const moduleParams = config.templateContext?.module?.parameters || {};
  
  return {
    params: moduleParams,
    features: moduleParams.features || {},
    framework: config.framework || config.templateContext?.project?.framework,
    paths: config.paths || config.templateContext?.paths || {},
  };
}
