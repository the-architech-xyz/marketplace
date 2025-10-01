import { NextRequest, NextResponse } from 'next/server';
import { runMigrations } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    await runMigrations();
    return NextResponse.json({ success: true, message: 'Migrations completed' });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 });
  }
}
