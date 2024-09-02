import { prisma } from '../lib/prismaClient'
// import { Product } from '../model/Product'

export class ProductService {
  async getProducts() {
    const products = await prisma.product.findMany()
    return products
  }

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
  //   async getProducts(): Promise<Product[]> {
  //     const products = await prisma.product.findMany()
  //     return products.map((product) => {
  //       return {
  //         name: product.name,
  //         price: product.price,
  //         description: product.description ?? '',
  //       }
  //     })
  //   }
}
