import express, { Express, response } from 'express'
import { ProductService } from '../../services/ProductService'

export function productsRoute(app: Express): void {
    const router = express.Router()
    const _productService = new ProductService();

    app.use('/api/products', router)

    router.get('/', async function (_, res, next) {
        try {
            const response = await _productService.ListAsync()
            return res.json({ response })
        }
        catch (error) {
            next(error)
        }
    })

    router.get('/:id', async function (req, res, next) {
        const { id } = req.params
        try {
            const response = await _productService.FindByIdAsync(parseInt(id))
            return res.json({ response })
        }
        catch (error) {
            next(error)
        }
    })

    router.post('/', async function (req, res, next) {
        try {
            const response = await _productService.AddAsync(req.body)
            return res.status(201).json({
                message: 'Created',
                data: response
            })
        }
        catch (error) {
            next(error)
        }
    })

    router.put('/:id', async function (req, res, next) {
        const { id } = req.params
        try {
            const response = await _productService.UpdateAsync(parseInt(id), req.body)
            return res.json({
                message: "Product updated",
                id: response.id,
                data: response
            })
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    return res.status(404).json({
                        message: error.message
                    });
                }
                console.error(`Error updating the product with id: ${id}, ${error.message}`);
                return res.status(500).json({
                    message: "An error occurred while trying to update the product",
                    error: error.message
                });
            }
        }
    })

    router.delete('/:id', async function (req, res, next) {
        const { id } = req.params
        try {
            const response = await _productService.DeleteAsync(parseInt(id))
            return res.json({
                message: "Product deleted",
                id: response.id
            })
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    return res.status(404).json({
                        message: error.message
                    });
                }
                console.error(`Error deleting the product with id: ${id}, ${error.message}`);
                return res.status(500).json({
                    message: "An error occurred while trying to delete the product",
                    error: error.message
                });
            }
        }
    })

}