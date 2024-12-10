export interface Product {
  id: number
  name: string
  description?: string
  image?: string
  variant: Variant[]
  option: Option[]
  collections: ICollection[]
  createdAt: Date
  updatedAt: Date
}

export interface ICollection {
  id: number
  name: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Variant {
  id: number
  product: Product
  productId: number
  name: string
  description?: string
  image?: string
  sku: string
  price: number
  stock: number
  optionValues: OptionValue[]
  createdAt: Date
  updatedAt: Date
}

export interface Option {
  id: number
  Product: Product
  productId: number
  name: string
  values: OptionValue[]
  createdAt: Date
  updatedAt: Date
}

export interface OptionValue {
  id: number
  option: Option
  optionId: number
  variant: Variant
  variantId: number
  value: string
  createdAt: Date
  updatedAt: Date
}
