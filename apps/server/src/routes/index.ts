import { Router } from 'express'
import routesProducts from './../modules/product/product.router'
import routesVariants from './../modules/variant/variant.router'
import routesCollections from './../modules/collection/collection.router'

const router: Router = Router()

router.use('/v1/products', routesProducts)
router.use('/v1/variants', routesVariants)
router.use('/v1/collections', routesCollections)

export default router
