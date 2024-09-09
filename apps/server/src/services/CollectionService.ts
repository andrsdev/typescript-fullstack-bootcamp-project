import { CollectionProduct } from '@repo/shared'
import { prisma } from '../lib/prismaClient'
export class CollectionService {
  async createCollection(name: string) {
    await prisma.collection.create({
      data: {
        name,
      },
    })
  }

  async getCollections(): Promise<CollectionProduct[]> {
    const collections = await prisma.collection.findMany()
    return collections.map((collection) => {
      return {
        name: collection.name,
        description: collection.description ?? '',
        id: collection.id,
      }
    })
  }

  async deleteCollection(id: number) {
    await prisma.collection.delete({
      where: {
        id: id,
      },
    })
  }

  async updateCollection(id: number, name: string) {
    await prisma.collection.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    })
  }
}
