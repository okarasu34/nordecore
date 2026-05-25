import { NextRequest, NextResponse } from 'next/server'
import { stripe, getCurrencyForCountry, PAYMENT_METHODS } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { orderId, country = 'NO' } = await req.json()

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, shippingAddress: true },
    })
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    const currency = getCurrencyForCountry(country)
    const paymentMethods = PAYMENT_METHODS[country.toUpperCase()] ?? PAYMENT_METHODS.DEFAULT

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total * 100),
      currency,
      payment_method_types: paymentMethods,
      metadata: {
        orderId: order.id,
        email: order.email,
        country,
      },
      receipt_email: order.email,
      description: `Nordecore Order #${order.id}`,
    })

    await prisma.order.update({
      where: { id: orderId },
      data: { stripePaymentId: paymentIntent.id },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      currency,
      amount: order.total,
    })
  } catch (error) {
    console.error('[PAYMENT INTENT]', error)
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 })
  }
}
