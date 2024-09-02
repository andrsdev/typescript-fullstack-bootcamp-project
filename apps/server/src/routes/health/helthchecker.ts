import { Router, Response, NextFunction } from 'express'
import { Healthcheck } from '../../model/HelthChecker'

export const healthchecker: Router = Router()

healthchecker.get(
  '/helthchecker',
  async (_, res: Response, next: NextFunction) => {
    const healthcheck: Healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
      appStatus: 'UP',
    }
    try {
      return res.json({ healthcheck })
    } catch (error) {
      healthcheck.message = error as Error
      res.status(503).json({ healthcheck })
      next(error)
    }
  },
)
