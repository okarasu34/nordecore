import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') ?? '1')
    const pageSize = parseInt(searchParams.get('pageSize') ?? '12')
    const sortBy = searchParams.get('sortBy') ?? 'newest'

    const where: any = { active: true }
    if (category) where.category = { slug: category }
    if (featured === 'true') where.featured = true
    if (search) where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { nameNo: { contains: search, mode: 'insensitive' } },
    ]

    const orderBy: any =
      sortBy === 'price_asc' ? { price: 'asc' } :
      sortBy === 'price_desc' ? { price: 'desc' } :
      { createdAt: 'desc' }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where, orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          category: true,
          brand: true,
          colors: true,
          sizes: true,
          images: { orderBy: { order: 'asc' } },
        },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      data: products,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    })
  } catch (error) {
    console.error('[PRODUCTS GET]', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const body = await req.json()

    const product = await prisma.product.create({
      data: {
        name: body.name,
        nameNo: body.nameNo,
        slug: body.slug,
        description: body.description,
        descriptionNo: body.descriptionNo,
        price: body.price,
        categoryId: body.categoryId,
        brandId: body.brandId,
        texture: body.texture,
        badge: body.badge,
        stock: body.stock ?? 0,
        featured: body.featured ?? false,
        colors: { create: body.colors ?? [] },
        sizes: { create: body.sizes ?? [] },
      },
      include: { category: true, colors: true, sizes: true },
    })

    return NextResponse.json({ data: product }, { status: 201 })
  } catch (error) {
    console.error('[PRODUCTS POST]', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}