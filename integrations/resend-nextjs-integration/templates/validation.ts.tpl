import { z } from 'zod';

export const emailSchema = z.object({
  to: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  html: z.string().optional(),
  text: z.string().optional(),
  from: z.string().email('Invalid from email').optional(),
  replyTo: z.string().email('Invalid reply-to email').optional(),
  cc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  bcc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
}).refine(
  (data) => data.html || data.text,
  {
    message: 'Either html or text content is required',
    path: ['html'],
  }
);

export const templateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  subject: z.string().min(1, 'Subject is required'),
  html: z.string().min(1, 'HTML content is required'),
  text: z.string().optional(),
  variables: z.array(z.string()).optional(),
});

export const webhookSchema = z.object({
  type: z.string(),
  data: z.record(z.any()),
  timestamp: z.string(),
});

export type EmailData = z.infer<typeof emailSchema>;
export type TemplateData = z.infer<typeof templateSchema>;
export type WebhookData = z.infer<typeof webhookSchema>;

export function validateEmail(data: unknown): EmailData {
  return emailSchema.parse(data);
}

export function validateTemplate(data: unknown): TemplateData {
  return templateSchema.parse(data);
}

export function validateWebhook(data: unknown): WebhookData {
  return webhookSchema.parse(data);
}
