import { NextRequest, NextResponse } from 'next/server'
import productsData from '@/app/data/products.json'

interface Product {
  id: string
  name: string
  vendor: string
  productType: string
  tags: string[]
  sku: string
  price: number
  compareAtPrice: number | null
  available: boolean
  imageUrl: string
  productUrl: string
  variantCount: number
}

function normalize(raw: unknown): Product {
  const r = raw as Record<string, unknown>
  const tagsRaw = r.tags
  const tags: string[] = Array.isArray(tagsRaw)
    ? (tagsRaw as unknown[]).map(String)
    : String(tagsRaw ?? '').split(',').map(s => s.trim()).filter(Boolean)
  return {
    id: String(r.id ?? ''),
    name: String(r.name ?? ''),
    vendor: String(r.vendor ?? ''),
    productType: String(r.productType ?? ''),
    tags,
    sku: String(r.sku ?? ''),
    price: parseFloat(String(r.price ?? '0')) || 0,
    compareAtPrice: r.compareAtPrice != null ? parseFloat(String(r.compareAtPrice)) || null : null,
    available: Boolean(r.available),
    imageUrl: String(r.imageUrl ?? ''),
    productUrl: String(r.productUrl ?? ''),
    variantCount: Number(r.variantCount ?? 0),
  }
}

const allProducts: Product[] = (productsData as unknown[]).map(normalize)

const TYPE_MAP: Record<string, string> = {
  'Home & Garden': 'HOME & GARDEN',
  'Health & Beauty': 'HEALTH & BEAUTY',
  'Food & Drink': 'FOOD & DRINK',
  'Stationery': 'STATIONERY',
  'Toys & Games': 'TOYS & GAMES',
  'Party & Seasonal': 'PARTY & SEASONAL',
  'Pet & Leisure': 'PET & LEISURE',
  'Clothing': 'CLOTHING',
}

const TAG_FAST_SELLERS = 'Category_Fast Sellers'
const TAG_FEATURED = 'Category_Featured Wholesale Products'
const TAG_TOP_BRANDS = 'Category_Top Brands'

const SPECIAL_TAG_MAP: Record<string, string> = {
  'Pallet Deals': 'Category_Pallet Deals',
  'Clearance': 'Category_Clearance',
  'Big Brands': TAG_TOP_BRANDS,
  'Fast Sellers': TAG_FAST_SELLERS,
  'Featured': TAG_FEATURED,
  'Refill Chargers': 'Category_DRINKS/CREAM CHARGERS',
}

const PAGE_SIZE = 24

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const category = searchParams.get('category') || 'All'
  const sort = searchParams.get('sort') || 'featured'
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const search = (searchParams.get('search') || '').toLowerCase().trim()
  const priceParam = searchParams.get('price') || ''
  const inStockOnly = searchParams.get('inStock') === 'true'
  const aiOnly = searchParams.get('aiOnly') === 'true'
  const pageSize = parseInt(searchParams.get('pageSize') || String(PAGE_SIZE), 10)

  let products = allProducts.filter(p => p.available && p.imageUrl)

  // Category filter
  if (category !== 'All') {
    const typeMatch = TYPE_MAP[category]
    const tagMatch = SPECIAL_TAG_MAP[category]
    if (typeMatch) {
      products = products.filter(p => p.productType === typeMatch)
    } else if (tagMatch) {
      products = products.filter(p => p.tags.includes(tagMatch))
    }
  }

  // Search filter
  if (search) {
    products = products.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.vendor.toLowerCase().includes(search)
    )
  }

  // Price range filter
  if (priceParam) {
    const [minStr, maxStr] = priceParam.split('-')
    const min = parseFloat(minStr)
    const max = parseFloat(maxStr)
    if (!isNaN(min)) products = products.filter(p => p.price >= min)
    if (!isNaN(max)) products = products.filter(p => p.price <= max)
  }

  // In stock filter (all available products are already filtered, this is a no-op but kept for future use)
  if (inStockOnly) {
    products = products.filter(p => p.available)
  }

  // AI picks — products with compareAtPrice (clearance/deals) or featured tags
  if (aiOnly) {
    products = products.filter(p =>
      (p.compareAtPrice && p.compareAtPrice > p.price) ||
      p.tags.includes(TAG_FEATURED) ||
      p.tags.includes(TAG_FAST_SELLERS)
    )
  }

  // Sort
  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price)
  } else if (sort === 'name-az') {
    products.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sort === 'discount') {
    products.sort((a, b) => {
      const discA = a.compareAtPrice ? (a.compareAtPrice - a.price) / a.compareAtPrice : 0
      const discB = b.compareAtPrice ? (b.compareAtPrice - b.price) / b.compareAtPrice : 0
      return discB - discA
    })
  } else {
    // featured: featured/fast-sellers first, then rest
    products.sort((a, b) => {
      const scoreA = (a.tags.includes(TAG_FEATURED) ? 2 : 0) +
                     (a.tags.includes(TAG_FAST_SELLERS) ? 1 : 0)
      const scoreB = (b.tags.includes(TAG_FEATURED) ? 2 : 0) +
                     (b.tags.includes(TAG_FAST_SELLERS) ? 1 : 0)
      return scoreB - scoreA
    })
  }

  const total = products.length
  const totalPages = Math.ceil(total / pageSize)
  const offset = (page - 1) * pageSize
  const items = products.slice(offset, offset + pageSize).map(p => ({
    id: p.id,
    name: p.name,
    vendor: p.vendor,
    productType: p.productType,
    tags: p.tags,
    sku: p.sku,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    imageUrl: p.imageUrl,
    productUrl: p.productUrl,
    variantCount: p.variantCount,
    aiPick: p.tags.includes(TAG_FEATURED) || p.tags.includes(TAG_FAST_SELLERS),
  }))

  return NextResponse.json({ items, total, page, pageSize, totalPages })
}
