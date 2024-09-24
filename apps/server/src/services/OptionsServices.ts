import { Request, Response } from 'express';
import { prisma } from '../lib/prismaClient';

// Create a new Option
export const createOption = async (req: Request, res: Response) => {
  try {
    const { productId, name } = req.body;
    const newOption = await prisma.option.create({
      data: {
        name,
        product: productId ? { connect: { id: productId } } : undefined,
      },
    });
    res.status(201).json(newOption);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create option', details: error });
  }
};

// Get all Options
export const getOptions = async (req: Request, res: Response) => {
  try {
    const options = await prisma.option.findMany();
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve options', details: error });
  }
};

// Get a single Option by ID
export const getOptionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const option = await prisma.option.findUnique({
      where: { id: parseInt(id) },
      include: { values: true },
    });
    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }
    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve option', details: error });
  }
};

// Update an Option
export const updateOption = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedOption = await prisma.option.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(updatedOption);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update option', details: error });
  }
};

// Delete an Option
export const deleteOption = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.option.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // Successfully deleted the option
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete option', details: error });
  }
};
