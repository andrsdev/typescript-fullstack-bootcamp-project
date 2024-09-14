export interface ProductCardProps {
  id: number
  image: string
  name: string
  price: number
}

export interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  createdAt: Date
  updatedAt: Date
  variants: Variant[]
}

export interface Variant {
  id: number
  name: string
  description: string
  image: string
  stock: number
  price: number
  productId: number
}
