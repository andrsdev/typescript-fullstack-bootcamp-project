import { prisma } from '../lib/prismaClient'
import { Product } from '@repo/shared'

export class ProductService {
  // async getProducts() {
  //   const products = await prisma.product.findMany()
  //   return products
  // }

  async deleteProduct(id: number) {
    // This will delete all the variants associated with the product id
    await prisma.variant.deleteMany({
      where: {
        productId: id,
      },
    })

    await prisma.product.delete({
      where: {
        id: id,
      },
    })
  }

  async createProduct(name: string, price: number, description: string) {
    await prisma.product.create({
      data: {
        name,
        price,
        description,
      },
    })
  }

  async updateProduct(
    id: number,
    name: string,
    price: number,
    description: string,
  ) {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name,
        price,
        description,
      },
    })
  }

  //This can be use if we want to return specific fields
  async getProducts(orderBy = {}): Promise<Product[]> {
    const products = await prisma.product.findMany({
      orderBy: orderBy,
    })
    return products.map((product) => {
      return {
        name: product.name,
        price: product.price,
        description: product.description ?? '',
        image: product.image ?? '',
        id: product.id,
      }
    })
  }

  async getProductById(id: number): Promise<Product[] | null> {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        variants: true,
      },
    })

    if (!product) {
      return null
    }

    return [
      {
        name: product.name,
        price: product.price,
        description: product.description ?? '',
        image: product.image ?? '',
        id: product.id,
        variants: product.variants.map((variant) => ({
          size: Number(variant.size),
          color: variant.color,
          stock: variant.stock,
        })),
      },
    ]
  }

  async getProductByName(name: string): Promise<Product[] | null> {
    const product = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    })

    if (!product) {
      return null
    }

    return product.map((product) => {
      return {
        name: product.name,
        price: product.price,
        description: product.description ?? '',
        image: product.image ?? '',
        id: product.id,
      }
    })
  }

  async getProductsByCollection(
    collectionName: string,
    orderBy = {},
  ): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        collections: {
          some: {
            name: collectionName,
          },
        },
      },
      orderBy: orderBy,
    })

    return products.map((product) => {
      return {
        name: product.name,
        price: product.price,
        description: product.description ?? '',
        image: product.image ?? '',
        id: product.id,
      }
    })
  }
}
