import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Obtener todos los productos
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error });
    }
  }

  // Obtener un producto por ID
  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(Number(id));

      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
  }

  // Crear un producto
  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = req.body; // Datos enviados desde el cliente
      const newProduct = await this.productService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el producto', error });
    }
  }

  // Actualizar un producto por ID
  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const productData = req.body;

      const updatedProduct = await this.productService.updateProduct(id, productData);

      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el producto', error });
    }
  }

  // Eliminar un producto por ID
  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(Number(id));
      res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }
}
