import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, items, shippingAddress, currency = 'EUR', locale = 'en' } = body

    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
    const shipping = subtotal >= 500 ? 0 : 25
    const tax = subtotal * 0.25
    const total = subtotal + shipping + tax

    // Prisma import dinamik yapıldı - build hatası önlemek için
    const { prisma } = await import('@/lib/prisma')

    const order = await prisma.order.create({
      data: {
        email, currency, locale, subtotal, shipping, tax, total,
        status: 'PENDING',
        shippingAddress: {
          create: {
            name: shippingAddress.name,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            city: shippingAddress.city,
            zip: shippingAddress.zip,
            country: shippingAddress.country,
            phone: shippingAddress.phone,
          },
        },
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            m2: item.m2,
            colorName: item.colorName,
            sizeName: item.sizeName,
          })),
        },
      },
      include: { items: { include: { product: true } }, shippingAddress: true },
    })

    return NextResponse.json({ data: order }, { status: 201 })
  } catch (error) {
    console.error('[ORDERS POST]', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const orders = await prisma.order.findMany({
      include: { items: true, shippingAddress: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ data: orders })
  } catch (error) {
    console.error('[ORDERS GET]', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}