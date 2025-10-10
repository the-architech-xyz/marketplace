/**
 * Team Usage API Route
 * 
 * Handles usage tracking and retrieval for teams within organizations
 */

import { NextRequest, NextResponse } from 'next/server';
import { getUsageService } from '@/lib/services/usage';

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string; teamId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric');
    
    // Use team-specific usage tracking
    const usageService = getUsageService();
    const teamMetric = metric ? `team:${params.teamId}:${metric}` : `team:${params.teamId}`;
    const usage = await usageService.getUsage(params.orgId, teamMetric);
    
    return NextResponse.json(usage);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch team usage' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { orgId: string; teamId: string } }
) {
  try {
    const { metric, value } = await request.json();
    
    const usageService = getUsageService();
    const teamMetric = `team:${params.teamId}:${metric}`;
    const record = await usageService.recordUsage(params.orgId, teamMetric, value);
    
    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to record team usage' },
      { status: 500 }
    );
  }
}
