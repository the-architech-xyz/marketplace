import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailData {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

export interface EmailTemplate {
  name: string;
  subject: string;
  html: string;
  text: string;
}

export class EmailService {
  static async sendEmail(data: SendEmailData) {
    try {
      const result = await resend.emails.send({
        from: data.from || process.env.FROM_EMAIL || 'noreply@example.com',
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
      });
      
      return { success: true, data: result };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  static async sendTemplate(templateName: string, to: string | string[], variables: Record<string, any> = {}) {
    // This would typically fetch from a database or template service
    const templates = {
      welcome: {
        subject: 'Welcome to <%= appName %>!',
        html: '<h1>Welcome to <%= appName %>!</h1><p>Thank you for joining us.</p>',
        text: 'Welcome to <%= appName %>! Thank you for joining us.'
      },
      // Add more templates as needed
    };

    const template = templates[templateName];
    if (!template) {
      throw new Error(`Template ${templateName} not found`);
    }

    // Replace variables in template
    let subject = template.subject;
    let html = template.html;
    let text = template.text;

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`<%= ${key %>}`, 'g');
      subject = subject.replace(regex, value);
      html = html.replace(regex, value);
      text = text.replace(regex, value);
    });

    return this.sendEmail({
      to,
      subject,
      html,
      text
    });
  }
}
