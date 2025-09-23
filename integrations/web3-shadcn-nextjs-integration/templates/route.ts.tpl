import { NextRequest, NextResponse } from 'next/server'
import { web3Core } from '@/lib/web3/core'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, value, data, gas } = body

    if (!to) {
      return NextResponse.json({ error: 'Recipient address is required' }, { status: 400 })
    }

    const transaction = {
      to: to as \