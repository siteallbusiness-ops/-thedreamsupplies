'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  vendor: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('dream-cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) localStorage.setItem('dream-cart', JSON.stringify(items))
  }, [items, ready])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
