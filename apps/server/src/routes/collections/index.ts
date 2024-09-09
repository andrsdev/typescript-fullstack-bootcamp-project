import { Router, Response, NextFunction } from 'express'
import { CollectionService } from '../../services/CollectionService'

export const collectionRouter: Router = Router()
const collectionService = new CollectionService()

collectionRouter.get(
  '/collections',
  async (_, res: Response, next: NextFunction) => {
    try {
      const result = await collectionService.getCollections()
      return res.json({ result })
    } catch (error) {
      next(error)
    }
  },
)
