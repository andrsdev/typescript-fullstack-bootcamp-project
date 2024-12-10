export interface IProduct {
  id: number
  name: string
  description?: string | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
}
