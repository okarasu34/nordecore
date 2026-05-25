import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'
import { prisma } from '@/lib/prisma'

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

export async function POST(req: NextRequest) {
  try {
    const { roomImageBase64, productId, area } = await req.json()

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { colors: true, category: true },
    })
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    // Build AI prompt based on product
    const materialDesc = buildMaterialPrompt(product, area)

    const output = await replicate.run(
      'stability-ai/stable-diffusion-inpainting:c28b92a7ecd66eee4aefcd8a94eb9e7f6c3a41e913642c51a002b8cf1b2a24f0' as any,
      {
        input: {
          image: roomImageBase64,
          prompt: materialDesc,
          num_inference_steps: 25,
          guidance_scale: 7.5,
          strength: 0.75,
        },
      }
    )

    const resultUrl = Array.isArray(output) ? output[0] : output

    return NextResponse.json({ resultUrl, productName: product.name })
  } catch (error: any) {
    console.error('[VISUALIZER]', error)
    return NextResponse.json({ error: error.message ?? 'AI processing failed' }, { status: 500 })
  }
}

function buildMaterialPrompt(product: any, area: string): string {
  const texture = product.texture
  const categoryName = product.category.name.toLowerCase()
  const color = product.colors[0]?.name ?? 'natural'

  const materialMap: Record<string, string> = {
    wood: `beautiful ${color} solid oak hardwood planks, wide plank flooring, natural wood grain texture, premium Scandinavian interior`,
    marble: `luxurious ${color} marble stone panels, elegant veining pattern, polished surface, high-end European interior`,
    herringbone: `sophisticated herringbone pattern ${color} oak parquet floor, classic European design, premium engineered wood`,
    vinyl: `modern ${color} luxury vinyl tile flooring, realistic stone texture, contemporary Scandinavian interior`,
    blackmarble: `dramatic black Nero Marquina marble with fine gold veining, luxury statement surface`,
    walnut: `rich American walnut ${color} wood panels, deep dark grain, thermally modified, premium Nordic interior`,
  }

  const material = materialMap[texture] ?? `premium ${categoryName} material, Nordic design`
  const areaText = area === 'floor' ? 'floor' : area === 'wall' ? 'wall' : 'floor and walls'

  return `Interior design photo with ${material} on the ${areaText}, photorealistic, high quality, professional interior photography, warm lighting, 8k resolution`
}
