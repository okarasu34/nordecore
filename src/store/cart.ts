'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, Color, Size } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: Product, options?: { color?: Color; size?: Size; m2?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Computed
  itemCount: number
  subtotal: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, options = {}) => {
        const { color, size, m2 } = options
        const existingId = `${product.id}-${color?.id ?? 'none'}-${size?.id ?? 'none'}`

        set((state) => {
          const existing = state.items.find((i) => i.id === existingId)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === existingId
                  ? { ...i, quantity: i.quantity + (m2 ?? 1), m2: (i.m2 ?? 0) + (m2 ?? 0) }
                  : i
              ),
              isOpen: true,
            }
          }
          const newItem: CartItem = {
            id: existingId,
            product,
            productId: product.id,
            color,
            colorId: color?.id,
            size,
            sizeId: size?.id,
            quantity: m2 ?? 1,
            m2,
          }
          return { items: [...state.items, newItem], isOpen: true }
        })
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.id !== id)
            : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      get itemCount() { return get().items.reduce((sum, i) => sum + i.quantity, 0) },
      get subtotal() { return get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0) },
    }),
    { name: 'Nordecore-cart', skipHydration: true }
  )
)
