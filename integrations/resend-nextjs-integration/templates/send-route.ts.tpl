import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/resend';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html, text, from } = await request.json();

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and either html or text' },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      to,
      subject,
      html,
      text,
      from: from || process.env.RESEND_FROM_EMAIL,
    });

    return NextResponse.json({ 
      success: true, 
      messageId: result.id,
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
