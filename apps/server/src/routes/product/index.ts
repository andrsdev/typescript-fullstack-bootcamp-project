import express, { Express } from 'express';
import { ProductController } from '../../controllers/ProductController';

export function productRoute(app: Express): void {
    const router = express.Router()
    const productController = new ProductController();
    app.use('/api/product', router)

    // Obtener todos los productos
    router.get('/', productController.getAllProducts);

    // Obtener un producto por ID
    router.get('/:id', productController.getProductById);

    // Crear un nuevo producto
    router.post('/', productController.createProduct);

    // Actualizar un producto
    router.patch('/:id', productController.updateProduct);

    // Eliminar un producto
    router.delete('/:id', productController.deleteProduct);
}