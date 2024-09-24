import { PrismaClient } from '@repo/db'
import { Variant } from '../interfaces/product.interface'

import { Product, UpdateProduct } from '../interfaces/product.interface'

const prisma = new PrismaClient()

export async function getProducts(
  sort: 'asc' | 'desc' = 'desc',
  filter: string,
) {
  return prisma.product.findMany({
    where: {
      name: {
        contains: filter,
        mode: 'insensitive',
      },
    },
    orderBy: [
      {
        price: sort,
      },
    ],
    include: {
      variants: true,
    },
  })
}

export async function getProductById(productId: number) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      variants: true,
    },
  })
}

export async function createProduct(product: Product) {
  return prisma.product.create({
    data: {
      name: product.name,
      description: product.description || '',
      image: product.image || '',
      price: product.price,
      createdAt: new Date(product.createdAt).toISOString(),
      updatedAt: new Date(product.updatedAt).toISOString(),
    },
  })
}

export async function createVariants(productId: number, variants: Variant[]) {
  const variantsData = variants.map((v) => ({ ...v, productId }))

  return prisma.variant.createMany({
    data: [...variantsData],
  })
}

export async function createProductCollection(
  productId: number,
  collectionId: number,
) {
  return prisma.productCollection.create({
    data: {
      productId,
      collectionId,
    },
  })
}

export async function updateProduct(productId: number, product: UpdateProduct) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...data } = product

  return prisma.product.update({
    where: {
      id: productId,
    },
    data: data,
  })
}

export async function deleteProduct(productId: number) {
  return prisma.product.delete({
    where: {
      id: productId,
    },
    include: {
      variants: true,
      collections: true,
    },
  })
}

export async function getProductsByCollection(
  collectionId: number,
  sort: 'asc' | 'desc' = 'desc',
  nameFilter: string,
) {
  return await prisma.product.findMany({
    where: {
      collections: {
        some: {
          collectionId: collectionId,
        },
      },
      name: {
        contains: nameFilter,
        mode: 'insensitive',
      },
    },
    orderBy: {
      price: sort,
    },
    include: {
      variants: true, // Incluir variantes si es necesario
    },
  })
}
