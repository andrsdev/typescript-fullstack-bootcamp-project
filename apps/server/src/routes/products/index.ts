import express,  { Express } from "express";
import { prisma } from "../../lib/prismaClient";
import { ProductsService } from "../../services/ProductsService";


export function productsRoute (app: Express):void {
    const router = express.Router();
    const service = new ProductsService();

    app.use('/app/products', router);

    // Gets a Product
    router.get('/', async function (_req, res, next) {
        try {
            const result = await service.getProducts();
            return res.json({ result })
        } catch(e) {
            next(e)
        }
        
    })

    // Delete a product
    router.delete('/:id', async function (req, res, next) {
        try {
            const productId = parseInt(req.params.id);
            await service.deleteProduct(productId);
            return res.status(204).send();
        } catch (e) {
            console.error(`Error deleting product ${e}`);
        }
    });

    // Update an existing product
    router.put('/:id', async function (req, res, next) {
        try {
            const productId = parseInt(req.params.id);
            const productData = req.body;
            const result = await service.updateProduct(productId, productData);
            return res.json({ result });
        } catch (e) {
            console.error(`Error Updating product ${e}`);
        }
    });

    // Create a new product
    router.post('/', async function (req, res, next) {
        try {
            const productData = req.body;
            const result = await service.createProduct(productData);
            return res.status(201).json({ result });
        } catch (e) {
            console.error(`Error Creating product ${e}`);
        }
    });
}

