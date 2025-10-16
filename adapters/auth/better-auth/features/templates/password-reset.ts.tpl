import { auth } from './config';

// Password reset utilities
export class PasswordResetManager {
  static async requestPasswordReset(email: string) {
    try {
      const resetToken = await auth.api.createPasswordResetToken({
        email,
      });

      // In production, integrate with your email service
      await this.sendPasswordResetEmail({
        to: email,
        subject: 'Reset your password',
        template: 'password-reset',
        data: {
          resetUrl: \`\${process.env.NEXTAUTH_URL}/auth/reset-password?token=\${resetToken}\`,
          email,
        },
      });

      return { success: true, token: resetToken };
    } catch (error) {
      console.error('Password reset request error:', error);
      return { success: false, error: error.message };
    }
  }

  static async resetPassword(token: string, newPassword: string) {
    try {
      const result = await auth.api.resetPassword({
        token,
        password: newPassword,
      });
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: error.message };
    }
  }

  static async validateResetToken(token: string) {
    try {
      const isValid = await auth.api.validatePasswordResetToken({ token });
      return { success: true, valid: isValid };
    } catch (error) {
      console.error('Token validation error:', error);
      return { success: false, error: error.message };
    }
  }

  private static async sendEmail({ to, subject, template, data }: {
    to: string;
    subject: string;
    template: string;
    data: Record<string, any>;
  }) {
    // This is a placeholder - integrate with your email service
    console.log('Sending password reset email:', { to, subject, template, data });
    
    // Example with Resend (if available)
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const emailContent = this.getEmailTemplate(template, data);
      
      return await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@yourapp.com',
        to,
        subject,
        html: emailContent,
      });
    }
  }

  private static getEmailTemplate(template: string, data: Record<string, any>): string {
    switch (template) {
      case 'password-reset':
        return \
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Reset your password</title>
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Reset your password</h1>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <a href="\${data.resetUrl}" 
               style="display: inline-block; background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
              Reset Password
            </a>
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #666;">\${data.resetUrl}</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
            </p>
            <p style="color: #666; font-size: 14px;">
              For security reasons, this link can only be used once.
            </p>
          </body>
          </html>
        \`;
      default:
        return '<p>Email template not found</p>';
    }
  }
}
