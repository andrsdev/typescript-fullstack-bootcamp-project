import { Request, Response } from 'express'
import { findVariant, findVariantsByProductId } from './variant.service'

export const index = async (req: Request, res: Response) => {
  const resp = await findVariant(req)

  return res.status(200).json(resp)
}

export const variantsByProductId = async (req: Request, res: Response) => {
  const resp = await findVariantsByProductId(req)

  return res.status(200).json(resp)
}
