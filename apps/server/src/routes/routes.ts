import express, { Router } from 'express'
import productRouter from '../api/product/product.routes'
import collectionRouter from '../api/collection/collection.routes'

const apiRouter: Router = express.Router()

apiRouter.use('/product', productRouter)
apiRouter.use('/collection', collectionRouter)

export default apiRouter
