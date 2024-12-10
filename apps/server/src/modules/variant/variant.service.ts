import { Request } from 'express'
import { PrismaClient } from '@repo/db'
import { IVariant } from './variant.types'

const client = new PrismaClient()

export const findVariant = async (req: Request): Promise<IVariant[]> => {
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

  const variants = await client.variant.findMany({
    where,
  })

  return variants
}

export const findVariantsByProductId = async (
  req: Request,
): Promise<IVariant[]> => {
  const { id } = req.params
  const { name, sortByPrice } = req.query

  const where = {}

  const order: {
    price: 'desc' | 'asc'
  } = sortByPrice === 'desc' ? { price: 'desc' } : { price: 'asc' }

  if (name) {
    Object.assign(where, {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    })
  }

  const variants = await client.variant.findMany({
    where: {
      productId: Number(id),
      ...where,
    },
    orderBy: order,
  })

  return variants
}
