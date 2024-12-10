/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import BaseError from './base.error'

export default class Handlers {
  static handlerErrorMiddleware(
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.error(err)
    next(err)
  }

  static handleError(
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(err.statusCode || 500).json({
      status: 'ERROR',
      message: err.message,
    })
  }
}
