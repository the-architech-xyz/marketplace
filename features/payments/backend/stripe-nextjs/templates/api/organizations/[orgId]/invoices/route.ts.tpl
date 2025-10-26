/**
 * Organization Invoices API Route
 * 
 * Handles fetching and managing organization invoices
 */

import { NextRequest, NextResponse } from 'next/server';
import { getOrganizationInvoices } from '@/lib/services/org-billing';

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const invoices = await getOrganizationInvoices(params.orgId);
    
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
