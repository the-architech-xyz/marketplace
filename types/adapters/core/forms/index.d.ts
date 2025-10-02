/**
 * Forms
 * 
 * Golden Core form handling with validation using React Hook Form and Zod
 */

export interface CoreFormsParams {

  /** Enable Zod for schema validation */
  zod?: boolean;

  /** Enable React Hook Form for form handling */
  reactHookForm?: boolean;

  /** Enable @hookform/resolvers for Zod integration */
  resolvers?: boolean;

  /** Enable accessibility features */
  accessibility?: boolean;

  /** Enable React Hook Form DevTools */
  devtools?: boolean;
}

export interface CoreFormsFeatures {}

// 🚀 Auto-discovered artifacts
export declare const CoreFormsArtifacts: {
  creates: [
    'src/lib/forms/core.ts',
    'src/lib/forms/validation.ts',
    'src/lib/forms/hooks.ts',
    'src/lib/forms/accessibility.ts',
    'src/components/forms/FormProvider.tsx',
    'src/components/forms/FormField.tsx',
    'src/components/forms/FormInput.tsx',
    'src/components/forms/FormTextarea.tsx',
    'src/components/forms/FormSelect.tsx',
    'src/components/forms/FormCheckbox.tsx',
    'src/components/forms/FormRadio.tsx',
    'src/components/forms/FormError.tsx',
    'src/types/forms.ts',
    'src/examples/ContactForm.tsx',
    'src/examples/LoginForm.tsx',
    'src/lib/forms/index.ts'
  ],
  enhances: [],
  installs: [
    { packages: ['zod'], isDev: false },
    { packages: ['react-hook-form'], isDev: false },
    { packages: ['@hookform/resolvers'], isDev: false },
    { packages: ['@hookform/devtools'], isDev: true }
  ],
  envVars: []
};

// Type-safe artifact access
export type CoreFormsCreates = typeof CoreFormsArtifacts.creates[number];
export type CoreFormsEnhances = typeof CoreFormsArtifacts.enhances[number];
