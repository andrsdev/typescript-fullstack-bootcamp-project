import express, { Express } from "express";
import { ProductsService } from "../../services/ProductService";
import { ProductController } from "../../controllers/productController";

export function productsRoute(app: Express): void {
    const router = express.Router()
    const service = new ProductsService()
    const productController = new ProductController()
    app.use('/api/products', router)

    router.get('/', productController.getAllProducts);
    router.get('/:id', productController.getProductById);
    
}