import { Request, Response } from 'express'
import {
  createProduct,
  deleteProduct,
  findProduct,
  updateProduct,
} from './product.service'

export const index = async (req: Request, res: Response) => {
  const resp = await findProduct(req)

  return res.status(200).json(resp)
}

export const create = async (req: Request, res: Response) => {
  const resp = await createProduct(req)

  return res.status(201).json(resp)
}

export const update = async (req: Request, res: Response) => {
  const resp = await updateProduct(req)

  return res.status(200).json(resp)
}

export const remove = async (req: Request, res: Response) => {
  const resp = await deleteProduct(req)

  return res.status(200).json(resp)
}
