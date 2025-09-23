// Email template management

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage for demo purposes
// In production, use a database
const templates: EmailTemplate[] = [];

export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  return templates;
}

export async function getEmailTemplate(id: string): Promise<EmailTemplate | null> {
  return templates.find(t => t.id === id) || null;
}

export async function createEmailTemplate(template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmailTemplate> {
  const newTemplate: EmailTemplate = {
    id: Math.random().toString(36).substr(2, 9),
    ...template,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  templates.push(newTemplate);
  return newTemplate;
}

export async function updateEmailTemplate(id: string, updates: Partial<Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>>): Promise<EmailTemplate | null> {
  const template = templates.find(t => t.id === id);
  if (!template) return null;
  
  Object.assign(template, updates, { updatedAt: new Date() });
  return template;
}

export async function deleteEmailTemplate(id: string): Promise<boolean> {
  const index = templates.findIndex(t => t.id === id);
  if (index === -1) return false;
  
  templates.splice(index, 1);
  return true;
}

// Pre-built email templates
export const defaultTemplates = {
  welcome: {
    name: 'Welcome Email',
    subject: 'Welcome to {{appName}}!',
    html: \