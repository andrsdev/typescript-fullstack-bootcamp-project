import express, { Express } from 'express'
import { prisma } from '../../lib/prismaClient';

export function collectionRouter(app: Express): void {
  const router = express.Router();
  app.use('/api/colection', router);

  router.get('/', async (req, res, next) => {
    try {
      const collections = await prisma.collection.findMany({
        include: { products: true },
      });
      res.status(200).json(collections);
    } catch (error) {
      next({ statusCode: 500, message: 'Error fetching collections '});
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const collection = await prisma.collection.findUnique({
        where: { id: Number(id) },
        include: { products: true },
      });
      if (!collection) {
        return next({ statusCode: 404, message: 'Collection not found'});
      }
      res.status(200).json(collection);
    } catch (error) {
      next({ statusCode: 500, message: 'Error fetching collection'});
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const newCollection = await prisma.collection.create({
        data: { name, description },
      });
      res.status(201).json(newCollection);
    } catch (error) {
      next({ statusCode: 500, message: 'Error saving collection'});
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const updatedCollection = await prisma.collection.update({
        where: { id: Number(id) },
        data: { name, description },
      });
      res.status(200).json(updatedCollection);
    } catch (error) {
      next({ statusCode: 500, message: 'Error updating collection'});
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await prisma.collection.delete({
        where: { id: Number(id) },
      });
      res.status(204).json({ message: 'Collection deleted' });
    } catch (error) {
      next({ statusCode: 500, message: 'Error deleting collection'});
    }
  });

}