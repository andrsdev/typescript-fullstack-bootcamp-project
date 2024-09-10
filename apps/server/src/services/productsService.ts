import { prisma } from "../lib/prismaClient";
import { Product } from "../models/Product";

export class ProductsService {
    async getProducts(): Promise<Product[]> {
      const products = await prisma.product.findMany({
        include: {
          variants: {
            include: {
              optionValues: true, // Include option values in each variant
            },
          },
          options: {
            include: {
              values: true, // Include option values
            },
          },
          collections: true, // Include collections
        },
      })
  
      return products.map((product)=>({
        name: product.name,
        description: product.description??'',
        image: product.image??'',
        variants: product.variants, 
        options: product.options,
        collections: product.collections,
      }))
    }
  }
  