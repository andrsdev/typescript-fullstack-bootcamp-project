import { Request } from 'express'
import { PrismaClient } from '@repo/db'
import { ICollection } from './collection.types'

const client = new PrismaClient()

export const findCollection = async (req: Request): Promise<ICollection[]> => {
  const { name } = req.query

  const where = {}

  if (name) {
    Object.assign(where, {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    })
  }

  const collections = await client.collection.findMany({
    where,
  })

  return collections
}
