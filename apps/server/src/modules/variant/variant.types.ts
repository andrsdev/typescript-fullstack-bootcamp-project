export interface IVariant {
  id: number
  productId: number
  name: string
  description?: string | null
  image?: string | null
  sku: string
  price: number
  stock: number
  createdAt: Date
  updatedAt: Date
}
