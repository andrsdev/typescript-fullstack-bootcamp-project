import { PrismaClient } from '@repo/db'

const prisma = new PrismaClient()

export async function getCollections() {
  return prisma.collection.findMany({
    select: {
      id: true,
      name: true,
    },
  })
}
