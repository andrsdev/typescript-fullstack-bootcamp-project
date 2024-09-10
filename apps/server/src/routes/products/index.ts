import express, {Express} from 'express'
import { prisma } from '../../lib/prismaClient'
import { ProductsService } from '../../services/productsService'

export function productsRoute(app: Express):void{
    const router = express.Router()
    const service = new ProductsService()
    app.use('/api/products',router)

    router.get('/', async function (_req, res, next) {
        try {
            const result = await service.getProducts()
            return res.json({ result})   
        } catch (e) {
            next(e)
        }
    })

}