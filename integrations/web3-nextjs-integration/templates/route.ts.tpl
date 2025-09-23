import { NextRequest, NextResponse } from 'next/server';
import { web3Core } from '@/lib/web3/core';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const balance = await web3Core.getBalance(address as \