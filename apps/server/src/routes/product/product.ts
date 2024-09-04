import express ,{ Express } from 'express'
import { prisma } from '../../lib/prismaClient';

export function productRouter(app: Express): void {
    const router = express.Router();
    app.use('/api/products', router);

    router.get('/', async (_req, res, next) => {
        try {
          const products = await prisma.product.findMany({
            include: { variants: true, collections: true },
          });
          res.status(200).json({statusCode: 200, data: products});
        } catch (error) {
          next({ statusCode: 500, message: 'Error fetching products '});
        }
      });
      
      router.get('/:id', async (req, res, next) => {
        try {
          const { id } = req.params;
          const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: { variants: true, collections: true },
          });
          if (!product) {
            return next({ statusCode: 404, message: 'Product not found'});
          }
          res.status(200).json({statusCode: 200,data: product});
        } catch (error) {
          next({ statusCode: 500, message: 'Error fetching product'});
        }
      });
      
      router.post('/', async (req, res, next) => {
        try {
          const { name, description, price } = req.body;
          const newProduct = await prisma.product.create({
            data: { name, description, price },
          });
          res.status(201).json({statusCode:200, message:'The product was successfully created',data:newProduct});
        } catch (error) {
          next({ statusCode: 500, message: 'Fail during creation of product'});
        }
      });
      
      router.put('/:id', async (req, res, next) => {
        try {
          const { id } = req.params;
          const { name, description, price } = req.body;
          const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: { name, description, price },
          });
          res.status(200).json({statusCode: 200, message: 'Success',data: updatedProduct});
        } catch (error) {
          next({ statusCode: 500, message: 'Product update failed'});
        }
      });
      
      router.delete('/:id', async (req, res, next) => {
        try {
          const { id } = req.params;
          await prisma.product.delete({
            where: { id: Number(id) },
          });
          res.status(204).json({ statusCode: 204 ,message: 'Product deleted' });
        } catch (error) {
          next({ statusCode: 500, message: 'Product deletion failed'});
        }
      });
    
}