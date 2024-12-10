export interface IVariant {
  id: number
  productId: number
  name: string
  description?: string
  image?: string
  sku: string
  price: number
  stock: number
  createdAt: Date
  updatedAt: Date
}
