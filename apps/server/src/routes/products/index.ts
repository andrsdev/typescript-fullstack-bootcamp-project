import express, { Express } from 'express'
import { ProducsService } from '../../services/ProductsService'

export function productsRoute(app: Express):void {
    const router = express.Router()
    const service = new ProducsService()


    app.use('/api/products', router)

    router.get('/', async function(_req, res, next) {

        try {
            const result = await service.getAllProducts()
              return res.json({ result})
        } catch (error) {   
            next(error)
        }
       
    })


    router.post('/', async function(req, res, next) {
        try {
            const result = await service.createProduct(req.body)
            return res.json({ result})
        } catch (error) {
            next(error)
        }
    })

    router.put('/:id', async function(req, res, next) {
        try {
            const result = await service.updateProduct(Number(req.params.id), req.body)
            return res.json({ result})
        } catch (error) {
            next(error)
        }
    })

    router.delete('/:id', async function(req, res, next) {
        try {
            const result = await service.deleteProduct(Number(req.params.id))
            return res.json({ result})
        } catch (error) {
            next(error)
        }
    })

    
}

