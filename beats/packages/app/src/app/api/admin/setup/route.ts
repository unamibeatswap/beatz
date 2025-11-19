import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (email !== 'info@unamifoundation.org') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Firebase removed - using Supabase/Web3 only
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 })
  }
}