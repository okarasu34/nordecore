import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where:{ slug:'wood-cladding' }, update:{}, create:{ name:'Wood Cladding', nameNo:'Trekledning', slug:'wood-cladding', order:1 }}),
    prisma.category.upsert({ where:{ slug:'marble-panels' }, update:{}, create:{ name:'Marble Panels', nameNo:'Marmorplater', slug:'marble-panels', order:2 }}),
    prisma.category.upsert({ where:{ slug:'parquet' }, update:{}, create:{ name:'Parquet', nameNo:'Parkett', slug:'parquet', order:3 }}),
    prisma.category.upsert({ where:{ slug:'luxury-vinyl' }, update:{}, create:{ name:'Luxury Vinyl', nameNo:'Luksusvinyl', slug:'luxury-vinyl', order:4 }}),
    prisma.category.upsert({ where:{ slug:'stone-tiles' }, update:{}, create:{ name:'Stone Tiles', nameNo:'Steinfliser', slug:'stone-tiles', order:5 }}),
    prisma.category.upsert({ where:{ slug:'exterior-cladding' }, update:{}, create:{ name:'Exterior Cladding', nameNo:'Utvendig kledning', slug:'exterior-cladding', order:6 }}),
  ])
  console.log('✅ Categories created')

  // Brands
  const brands = await Promise.all([
    prisma.brand.upsert({ where:{ slug:'kahrs' }, update:{}, create:{ name:'Kährs', slug:'kahrs', country:'Sweden', website:'kahrs.com', featured:true }}),
    prisma.brand.upsert({ where:{ slug:'boen' }, update:{}, create:{ name:'Boen', slug:'boen', country:'Norway', website:'boen.com', featured:true }}),
    prisma.brand.upsert({ where:{ slug:'tarkett' }, update:{}, create:{ name:'Tarkett', slug:'tarkett', country:'Sweden', website:'tarkett.com', featured:false }}),
    prisma.brand.upsert({ where:{ slug:'pergo' }, update:{}, create:{ name:'Pergo', slug:'pergo', country:'Sweden', website:'pergo.com', featured:false }}),
  ])
  console.log('✅ Brands created')

  // Products
  const products = [
    {
      name:'Nordic Oak — Wide Plank', nameNo:'Nordisk Eik — Bred Planke',
      slug:'nordic-oak-wide-plank',
      description:'Brushed solid oak with natural grain variation. Available in 5 finishes, compatible with underfloor heating. Our bestselling floor for a reason.',
      descriptionNo:'Børstet massiv eik med naturlig kornvariasjon. Tilgjengelig i 5 overflater, kompatibel med gulvvarme.',
      price:89, texture:'wood', badge:'Bestseller', stock:100, featured:true,
      categorySlug:'wood-cladding', brandSlug:'kahrs',
      colors:[{ name:'Natural Oak', nameNo:'Naturlig Eik', hex:'#8B6040' },{ name:'Dark Walnut', nameNo:'Mørk Valnøtt', hex:'#4A3020' },{ name:'Light Ash', nameNo:'Lys Ask', hex:'#C8B090' },{ name:'Smoked Oak', nameNo:'Røkt Eik', hex:'#6A5030' },{ name:'Ebony', nameNo:'Ibenholt', hex:'#2A1A0A' }],
      sizes:[{ label:'122×18×1800mm' },{ label:'190×18×1800mm', width:190, length:1800, thickness:18 },{ label:'240×20×2200mm' }],
    },
    {
      name:'Calacatta Gold — Slab', nameNo:'Calacatta Gull — Plate',
      slug:'calacatta-gold-slab',
      description:'High-pressure laminate marble-look panels. Waterproof and heat resistant up to 180°C. Scratch resistant surface.',
      descriptionNo:'Høytrykklaminatplater med marmorutseende. Vanntett og varmebestandig opp til 180°C.',
      price:124, texture:'marble', badge:'New', stock:50, featured:true,
      categorySlug:'marble-panels', brandSlug:null,
      colors:[{ name:'White Gold', hex:'#D4C8B0' },{ name:'Black Marble', hex:'#2A2820' },{ name:'Silver Grey', hex:'#8A8070' }],
      sizes:[{ label:'1200×600mm' },{ label:'2400×1200mm' },{ label:'3000×1200mm' }],
    },
    {
      name:'Herringbone Oak — Classic', nameNo:'Fiskebein Eik — Klassisk',
      slug:'herringbone-oak-classic',
      description:'Engineered 3-layer herringbone parquet. Compatible with all underfloor heating systems. FSC certified.',
      descriptionNo:'Konstruert 3-lags fiskebeinparkett. Kompatibel med alle gulvvarmesystemer.',
      price:76, texture:'herringbone', badge:'Popular', stock:75, featured:true,
      categorySlug:'parquet', brandSlug:'boen',
      colors:[{ name:'Honey', hex:'#6A4820' },{ name:'Sand', hex:'#9A7840' },{ name:'Espresso', hex:'#3A2810' }],
      sizes:[{ label:'70×350mm' },{ label:'90×450mm' }],
    },
    {
      name:'Arctic Grey — LVT Click', nameNo:'Arktisk Grå — LVT Klikk',
      slug:'arctic-grey-lvt-click',
      description:'4.5mm SPC rigid core luxury vinyl tile. 100% waterproof. Perfect for kitchens, bathrooms and high-traffic areas.',
      descriptionNo:'4,5mm SPC stiv kjerne luksusvinylflise. 100% vanntett. Perfekt for kjøkken, bad og høytrafikkerte områder.',
      price:48, texture:'vinyl', badge:null, stock:200, featured:true,
      categorySlug:'luxury-vinyl', brandSlug:'tarkett',
      colors:[{ name:'Arctic Grey', hex:'#8A9AA8' },{ name:'Storm', hex:'#4A5A68' },{ name:'Frost White', hex:'#C8D0D8' },{ name:'Midnight', hex:'#2A3038' }],
      sizes:[{ label:'181×1210mm' },{ label:'228×1524mm' }],
    },
    {
      name:'Nero Marquina — Matte', nameNo:'Nero Marquina — Matt',
      slug:'nero-marquina-matte',
      description:'Deep black marble-look panel with fine gold veining. Statement walls and feature floors for luxury interiors.',
      descriptionNo:'Dypt svart marmorlignende plate med fin gullåring. Fremtredende vegger og gulv.',
      price:156, texture:'blackmarble', badge:'Exclusive', stock:30, featured:true,
      categorySlug:'marble-panels', brandSlug:null,
      colors:[{ name:'Jet Black', hex:'#1a1a18' },{ name:'Warm Black', hex:'#2A2015' }],
      sizes:[{ label:'1200×600mm' },{ label:'2400×1200mm' }],
    },
    {
      name:'American Walnut — Smoked', nameNo:'Amerikansk Valnøtt — Røkt',
      slug:'american-walnut-smoked',
      description:'Thermally modified American walnut. Rich dark tone. Perfect for interior walls, ceilings and feature panels.',
      descriptionNo:'Termisk modifisert amerikansk valnøtt. Rik mørk tone. Perfekt for innvendige vegger.',
      price:112, texture:'walnut', badge:null, stock:60, featured:false,
      categorySlug:'wood-cladding', brandSlug:'kahrs',
      colors:[{ name:'Dark Smoke', hex:'#3A2010' },{ name:'Ebony', hex:'#201008' },{ name:'Cognac', hex:'#5A3820' }],
      sizes:[{ label:'120×12×2400mm' },{ label:'180×15×2400mm' }],
    },
  ]

  for (const p of products) {
    const category = categories.find(c => c.slug === p.categorySlug)!
    const brand = brands.find(b => b.slug === p.brandSlug)

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name, nameNo: p.nameNo, slug: p.slug,
        description: p.description, descriptionNo: p.descriptionNo,
        price: p.price, texture: p.texture, badge: p.badge,
        stock: p.stock, featured: p.featured,
        categoryId: category.id,
        brandId: brand?.id,
        colors: { create: p.colors },
        sizes: { create: p.sizes },
      },
    })
  }

  console.log('✅ Products created')
  console.log('🎉 Seed complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
