/**
 * Blueprint Configuration Types - Runtime Implementation
 */

export function extractTypedModuleParameters(config) {
  return {
    params: config.parameters || {},
    features: config.features || {},
    framework: config.framework,
    paths: config.paths || {},
  };
}
