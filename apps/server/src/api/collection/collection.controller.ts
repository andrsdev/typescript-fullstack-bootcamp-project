import { Request, Response } from 'express'
import { getCollections } from './collection.model'

export async function listCollections(_: Request, res: Response) {
  const result = await getCollections()

  return res.json({ collections: result })
}
