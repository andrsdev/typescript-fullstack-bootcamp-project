import { Option, Variant } from "@repo/db"

export type Product = {
    id: number
    name: string
    description: string
    image: string
    options: Option[]
    variants: Variant[]
}