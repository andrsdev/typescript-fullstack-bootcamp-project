import { Request, Response } from 'express';
import { prisma } from '../lib/prismaClient';


// Create a new variant
export const createVariant = async (req: Request, res: Response) => {
  try {
    const { name, description, image, sku, price, stock } = req.body;
    const newVariant = await prisma.variant.create({
      data: {
        name,
        description,
        image, 
        sku,
        price,
        stock,
      }
    });
    res.status(201).json(newVariant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create variant', details: error });
  }
};

// Get all variants
export const getVariants = async (req: Request, res: Response) => {
  try {
    const variants = await prisma.variant.findMany();
    res.status(200).json(variants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve variants', details: error });
  }
};

// Get a single variant by ID
export const getVariantById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const variant = await prisma.variant.findUnique({
      where: { id: parseInt(id) }
    });
    if (!variant) {
      return res.status(404).json({ error: 'variant not found' });
    }
    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve variant', details: error });
  }
};

// Update a variant
export const updateVariant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, image, sku, price, stock } = req.body;
  try {
    const updatedvariant = await prisma.variant.update({
      where: { id: parseInt(id) },
      data: { name, description, image, sku, price, stock }
    });
    res.status(200).json(updatedvariant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update variant', details: error });
  }
};

// Delete a variant without worrying about related collections being deleted
export const deleteVariant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Just delete the variant
    await prisma.variant.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // Successfully deleted the variant
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete variant', details: error });
  }
};