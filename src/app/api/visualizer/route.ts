import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { roomImageBase64, productId, area } = await req.json()

    const { prisma } = await import('@/lib/prisma')

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { colors: true, category: true },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Replicate API henüz kurulmadı — placeholder response
    // İleride gerçek AI entegrasyonu eklenecek
    return NextResponse.json({
      resultUrl: roomImageBase64,
      productName: product.name,
      message: 'AI visualizer coming soon',
    })

  } catch (error: any) {
    console.error('[VISUALIZER]', error)
    return NextResponse.json({ error: error.message ?? 'AI processing failed' }, { status: 500 })
  }
}