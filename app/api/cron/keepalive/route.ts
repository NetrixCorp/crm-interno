import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`
    return NextResponse.json({ alive: true, timestamp: new Date().toISOString() })
  } catch (error) {
    console.error('Keepalive error:', error)
    return NextResponse.json({ alive: false }, { status: 500 })
  }
}
