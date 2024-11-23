import express, { Express } from 'express';
import { ProductController } from '../../controllers/productController';

export function productsRoute(app: Express): void {
  const router = express.Router();
  const productController = new ProductController();

  // Prefijo de la ruta
  app.use('/api/products', router);

  // Endpoints
  router.get('/', productController.getAllProducts.bind(productController)); // Listar todos los productos
  router.get('/:id', productController.getProductById.bind(productController)); // Obtener producto por ID
  router.post('/', productController.createProduct.bind(productController)); // Crear un producto
  router.put('/:id', productController.updateProduct.bind(productController)); // Actualizar producto por ID
  router.delete('/:id', productController.deleteProduct.bind(productController)); // Eliminar producto por ID
}

