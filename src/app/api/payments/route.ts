import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { orderId, country = 'NO' } = await req.json()

    const { prisma } = await import('@/lib/prisma')

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, shippingAddress: true },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Stripe henüz kurulmadı — placeholder response
    return NextResponse.json({
      clientSecret: 'placeholder',
      orderId: order.id,
      amount: order.total,
      currency: 'eur',
    })

  } catch (error) {
    console.error('[PAYMENT INTENT]', error)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}