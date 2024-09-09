export type ProductVariants = {
  size: number
  color: string
  stock: number
}
export type Product = {
  name: string
  price: number
  description: string
  image: string
  id: number
  variants?: ProductVariants[]
}
