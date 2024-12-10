import { Request, Response, NextFunction } from 'express'

type asyncExpressFunction<T> = (req: Request, res: Response) => Promise<T>

const Call =
  <T>(method: asyncExpressFunction<T>) =>
  (req: Request, res: Response, next: NextFunction) =>
    method(req, res).catch((err: string) => next(err))

export default Call
