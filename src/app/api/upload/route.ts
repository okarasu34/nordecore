import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { image, folder = 'deconor/products' } = await req.json()

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const { cloudinary } = await import('@/lib/cloudinary')

    const result = await cloudinary.uploader.upload(image, {
      folder,
      transformation: [
        { width: 1200, height: 900, crop: 'fill', quality: 'auto', fetch_format: 'auto' },
      ],
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    })
  } catch (error: any) {
    console.error('[UPLOAD]', error)
    return NextResponse.json({ error: error.message ?? 'Upload failed' }, { status: 500 })
  }
}