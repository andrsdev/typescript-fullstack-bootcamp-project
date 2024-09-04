import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: { statusCode: number; message: string; },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
