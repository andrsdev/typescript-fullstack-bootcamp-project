import { Request, Response } from 'express';
import { prisma } from '../lib/prismaClient';


// Create a new Collection
export const createCollection = async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body;
    const newCollection = await prisma.collection.create({
      data: {
        name,
        description,
      }
    });
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Collection', details: error });
  }
};

// Get all Collections
export const getCollections = async (req: Request, res: Response) => {
  try {
    const Collections = await prisma.collection.findMany();
    res.status(200).json(Collections);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Collections', details: error });
  }
};

// Get a single Collection by ID
export const getCollectionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const Collection = await prisma.collection.findUnique({
      where: { id: parseInt(id) }
    });
    if (!Collection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.status(200).json(Collection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve Collection', details: error });
  }
};

// Update a Collection
export const updateCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCollection = await prisma.collection.update({
      where: { id: parseInt(id) },
      data: { name, description }
    });
    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Collection', details: error });
  }
};

// Delete a Collection without worrying about related collections being deleted
export const deleteCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Just delete the Collection
    await prisma.collection.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // Successfully deleted the Collection
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Collection', details: error });
  }
};
