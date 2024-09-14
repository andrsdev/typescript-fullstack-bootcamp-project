export interface ProductParams {
  id: number
}

export interface Variant {
  name: string
  description?: string
  image?: string
  stock: number
  price: number
}

export interface Product {
  name: string
  description?: string
  image?: string
  price: number
  createdAt: string
  updatedAt: string
  variants: Variant[]
  collection: number
}

export interface UpdateProduct {
  id: number
  name?: string
  description?: string
  image?: string
  price?: number
  updatedAt?: string
}

export interface ProductQuery {
  sort?: 'asc' | 'desc'
  name?: string
}

export interface ProductParams {
  id: number
}
