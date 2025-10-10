/**
 * Organization Usage API Route
 * 
 * Handles usage tracking and retrieval for organizations
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUsageService } from '@/lib/services/usage';

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric');
    
    const usageService = getUsageService();
    const usage = metric
      ? await usageService.getUsage(params.orgId, metric)
      : await usageService.getCurrentPeriodUsage(params.orgId);
    
    return NextResponse.json(usage);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch usage' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const { metric, value } = await request.json();
    
    const usageService = getUsageService();
    const record = await usageService.recordUsage(params.orgId, metric, value);
    
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to record usage' },
      { status: 500 }
    );
  }
}
