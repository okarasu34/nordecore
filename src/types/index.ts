// ─── PRODUCT TYPES ──────────────────────────────────────────
export interface Product {
  id: string
  name: string
  nameNo: string
  slug: string
  description: string
  descriptionNo: string
  price: number
  priceNok?: number
  category: Category
  categoryId: string
  brand?: Brand
  colors: Color[]
  sizes: Size[]
  images: Image[]
  badge?: string
  texture: TextureType
  stock: number
  featured: boolean
  active: boolean
  createdAt: string
}

export interface Category {
  id: string
  name: string
  nameNo: string
  slug: string
  description?: string
  imageUrl?: string
  order: number
}

export interface Brand {
  id: string
  name: string
  slug: string
  logoUrl?: string
  country?: string
  website?: string
  description?: string
  featured: boolean
}

export interface Color {
  id: string
  name: string
  nameNo?: string
  hex: string
}

export interface Size {
  id: string
  label: string
  width?: number
  length?: number
  thickness?: number
}

export interface Image {
  id: string
  url: string
  alt?: string
  order: number
}

export type TextureType = 'wood' | 'marble' | 'herringbone' | 'vinyl' | 'blackmarble' | 'walnut' | 'stone' | 'exterior'

// ─── CART TYPES ─────────────────────────────────────────────
export interface CartItem {
  id: string
  product: Product
  productId: string
  colorId?: string
  color?: Color
  sizeId?: string
  size?: Size
  quantity: number
  m2?: number
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  itemCount: number
}

// ─── ORDER TYPES ─────────────────────────────────────────────
export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'

export interface Order {
  id: string
  email: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
  shippingAddress?: Address
  trackingNumber?: string
  createdAt: string
}

export interface OrderItem {
  id: string
  product: Product
  name: string
  price: number
  quantity: number
  m2?: number
  colorName?: string
  sizeName?: string
}

// ─── ADDRESS TYPES ───────────────────────────────────────────
export interface Address {
  id: string
  name: string
  company?: string
  line1: string
  line2?: string
  city: string
  state?: string
  zip: string
  country: string
  phone?: string
}

// ─── USER TYPES ──────────────────────────────────────────────
export interface User {
  id: string
  email: string
  name?: string
  role: 'CUSTOMER' | 'ADMIN' | 'EDITOR'
}

// ─── LOCALE TYPES ────────────────────────────────────────────
export type Locale = 'en' | 'no'

export interface I18nText {
  en: string
  no: string
}

// ─── API RESPONSE TYPES ──────────────────────────────────────
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ─── FILTER TYPES ────────────────────────────────────────────
export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  colors?: string[]
  featured?: boolean
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  page?: number
  pageSize?: number
}

// ─── AI VISUALIZER TYPES ─────────────────────────────────────
export interface VisualizerRequest {
  roomImageUrl: string
  productId: string
  area: 'floor' | 'wall' | 'both'
}

export interface VisualizerResult {
  originalUrl: string
  resultUrl: string
  productName: string
}
