import { Request, Response } from 'express'
import { findCollection } from './collection.service'

export const index = async (req: Request, res: Response) => {
  const resp = await findCollection(req)

  return res.status(200).json(resp)
}
