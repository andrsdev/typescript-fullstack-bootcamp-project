import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { Product } from '../model/Product';

const productService = new ProductService();

export class ProductController {


    // Obtener todos los productos
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

    // Obtener un producto por ID
    async getProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const product = await productService.getProductById(Number(id));
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product' });
        }
    }

    // Crear un nuevo producto
    async createProduct(req: Request, res: Response): Promise<void> {
        const { name, description }: Product = req.body;
        console.log(name)
        try {
            if (!name) {
                res.status(400).json({ message: 'Name is required' });
                return;
            }
            const newProduct = await productService.createProduct({ name, description });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    // Actualizar un producto
    async updateProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, description }: Product = req.body;

        try {
            const updatedProduct = await productService.updateProduct(Number(id), { name, description });
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    // Eliminar un producto
    async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deletedProduct = await productService.deleteProduct(Number(id));
            if (deletedProduct) {
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    }
}