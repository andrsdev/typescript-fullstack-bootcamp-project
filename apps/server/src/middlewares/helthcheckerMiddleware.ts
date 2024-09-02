import { Router } from 'express'

export const healthcheckerMiddleware: Router = Router()

healthcheckerMiddleware.use((req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
    )
  })

  next()
})
