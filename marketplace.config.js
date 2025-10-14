/**
 * Marketplace Defaults Configuration
 *
 * Auto-includes opinionated modules for all Next.js projects
 * No conditions - just simple auto-inclusion for v1
 */
export const MARKETPLACE_DEFAULTS = {
    autoInclude: [
        'quality/eslint',
        'quality/prettier'
        // Removed 'data-fetching/tanstack-query' and 'state/zustand' 
        // These should only be added when explicitly needed by modules
    ]
};
//# sourceMappingURL=marketplace.config.js.map