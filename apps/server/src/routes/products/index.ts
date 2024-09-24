import express, { Express } from 'express'
import { BaseResponse, BaseResponseGeneric, Product } from '@repo/schemas';
import { ProductService } from '../../services/ProductService'
import { ProductDtoResponse } from '@repo/schemas';


export function productsRoute(app: Express): void {
    const router = express.Router()
    const _productService = new ProductService();

    app.use('/api/products', router)

    router.get('/', async function (_, res, next) {

        let response: BaseResponseGeneric<ProductDtoResponse[]>
        try {
            const data = await _productService.ListAll()
            response = {
                status: 'success',
                data: data,
            }
            res.status(200)
        }
        catch (error) {
            response = {
                status: 'error',
                data: [],
                message: 'error in listing products',
            }
            res.status(400)
            next(error)
        }
        return res.json(response)
    })

    router.get('/:id', async function (req, res, next) {
        const { id } = req.params
        let response: BaseResponseGeneric<ProductDtoResponse>
        try {
            const data = await _productService.GetById(parseInt(id))
            if (!data) {
                response = {
                    status: 'error',
                    data: null,
                    message: 'Product not found',
                };
                return res.status(404).json(response);
            }
            response = {
                status: 'success',
                data: data,
            }
            res.status(200)

        }
        catch (error) {
            response = {
                status: 'error',
                data: null,
                message: 'An error occurred while trying to find the product',
            }
            res.status(500)
            next(error)
        }
        return res.json(response)
    })

    router.post('/', async function (req, res, next) {
        let response: BaseResponseGeneric<Product>
        try {
            const product = await _productService.Add(req.body)
            response = {
                status: 'success',
                data: product,
            }
            res.status(201)
        }
        catch (error) {
            response = {
                status: 'error',
                data: null,
                message: 'An error occurred while trying to create the product',
            }
            res.status(400)
            next(error)
        }

        return res.json(response)
    })

    router.put('/:id', async function (req, res, next) {
        let response: BaseResponse
        const { id } = req.params
        try {
            const product = await _productService.Update(parseInt(id), req.body)
            response ={
                status: 'success',
                message: `Product with id: ${product.id} updated`,
            }
            return res.status(200).json(response)
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    response = {
                        status: 'error',
                        message: error.message,
                    }
                    return res.status(404).json(response)
                } else {
                    response = {
                        status: 'error',
                        message: 'An error occurred while trying to update the product',
                    }
                    return res.status(500).json(response)
                }
            }
            next(error)
        }
    })

    router.delete('/:id', async function (req, res, next) {
        let response: BaseResponse
        const { id } = req.params
        try {
            const product = await _productService.Delete(parseInt(id))
            response = {
                status: 'success',
                message: `Product with id: ${product.id} deleted`,
            }
            return res.status(200).json(response)
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    response = {
                        status: 'error',
                        message: error.message,
                    }
                    return res.status(404).json(response)
                } else {
                    response = {
                        status: 'error',
                        message: 'An error occurred while trying to delete the product',
                    }
                    return res.status(500).json(response)
                }
            }
            next(error)
        }
    })
}