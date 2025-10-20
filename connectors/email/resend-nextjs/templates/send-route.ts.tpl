/**
 * Send Email API Route
 * 
 * Provided by: connectors/email/resend-nextjs
 * 
 * Basic email sending via Resend SDK
 */

import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/email/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, text, from } = body;

    if (!to || !subject || (!html && !text)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and html or text' },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: from || process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to,
      subject,
      html,
      text,
    });

    return NextResponse.json({ success: true, id: result.data?.id }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

