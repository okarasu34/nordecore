import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Stripe webhook - ileride aktif edilecek
    const body = await req.text()
    console.log('Webhook received:', body.slice(0, 100))
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[WEBHOOK]', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}