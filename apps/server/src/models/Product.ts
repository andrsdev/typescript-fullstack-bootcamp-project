import { Variant, Option, Collection } from "@repo/db"

export type Product = {
    name: String,
    description: String,
    image: String,
    variants: Variant[],
    options: Option[],     
    collections: Collection[] 
}