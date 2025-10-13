import { render } from '@react-email/render';
import { getTemplateComponent } from './template-registry';
import type { TemplateContext, RenderTemplateResult } from './template-types';

/**
 * Render React Email Template to HTML String
 * 
 * This is the critical bridge function that:
 * 1. Takes a template name and context data
 * 2. Fetches the React component from registry
 * 3. Renders it to a provider-agnostic HTML string
 * 
 * The output HTML can be used with ANY email provider (Resend, SendGrid, AWS SES, etc.)
 */

/**
 * Render email template to HTML string
 * 
 * @param templateName - Name of the template to render
 * @param context - Data to pass to the template
 * @returns HTML string ready for any email provider
 */
export async function renderTemplate(
  templateName: string,
  context: TemplateContext
): Promise<RenderTemplateResult> {
  try {
    // Get template component from registry
    const TemplateComponent = getTemplateComponent(templateName);

    if (!TemplateComponent) {
      return {
        success: false,
        error: `Template '${templateName}' not found in registry`
      };
    }

    // Render React component to HTML string
    const html = await render(TemplateComponent(context));

    // Generate plain text version (optional)
    const text = await render(TemplateComponent(context), {
      plainText: true
    });

    return {
      success: true,
      html,
      text
    };

  } catch (error: any) {
    console.error(`[Email Templates] Error rendering template '${templateName}':`, error);
    return {
      success: false,
      error: error.message || 'Failed to render template'
    };
  }
}

/**
 * Render multiple templates in parallel
 * 
 * @param templates - Array of template names and contexts
 * @returns Array of HTML strings
 */
export async function renderTemplates(
  templates: Array<{ name: string; context: TemplateContext }>
): Promise<RenderTemplateResult[]> {
  return Promise.all(
    templates.map(({ name, context }) => renderTemplate(name, context))
  );
}

/**
 * Preview template (for development)
 * Returns HTML that can be opened in a browser
 * 
 * @param templateName - Name of the template to preview
 * @param context - Data to pass to the template
 * @returns HTML string with additional styling for browser viewing
 */
export async function previewTemplate(
  templateName: string,
  context: TemplateContext
): Promise<string> {
  const result = await renderTemplate(templateName, context);
  
  if (!result.success) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Template Preview Error</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            .error { color: red; background: #fee; padding: 15px; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="error">
            <h2>Error Rendering Template</h2>
            <p>${result.error}</p>
          </div>
        </body>
      </html>
    `;
  }

  return result.html;
}

