import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Get email campaigns
    const campaigns = [];

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error fetching email campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch email campaigns' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, subject, templateId, recipientList, scheduledAt } = body;

    if (!name || !subject || !templateId || !recipientList) {
      return NextResponse.json(
        { error: 'Missing required fields: name, subject, templateId, recipientList' },
        { status: 400 }
      );
    }

    // Create email campaign
    const campaign = {
      id: 'campaign-' + Date.now(),
      name,
      subject,
      templateId,
      recipientList,
      status: 'draft',
      scheduledAt: scheduledAt || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Error creating email campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create email campaign' },
      { status: 500 }
    );
  }
}
