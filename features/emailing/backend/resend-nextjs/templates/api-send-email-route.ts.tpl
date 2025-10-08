import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, text, from } = body;

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and either html or text' },
        { status: 400 }
      );
    }

    const emailData = {
      from: from || process.env.FROM_EMAIL || 'noreply@example.com',
      to,
      subject,
      ...(html && { html }),
      ...(text && { text })
    };

    const data = await resend.emails.send(emailData);

    return NextResponse.json({
      id: data.id,
      to,
      subject,
      status: 'sent',
      sentAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
