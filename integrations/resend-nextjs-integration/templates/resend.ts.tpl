import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
  tags?: Array<{ name: string; value: string }>;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const result = await resend.emails.send({
      from: options.from || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
      tags: options.tags,
    });

    return result;
  } catch (error) {
    console.error('Resend API error:', error);
    throw new Error('Failed to send email');
  }
}

export { resend };
