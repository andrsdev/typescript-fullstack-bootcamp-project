import { Request, Response } from 'express';
import { prisma } from '../lib/prismaClient';

// Create a new OptionValue
export const createOptionValue = async (req: Request, res: Response) => {
  try {
    const { optionId, value } = req.body;
    const newOptionValue = await prisma.optionValue.create({
      data: {
        value,
        option: optionId ? { connect: { id: optionId } } : undefined,
      },
    });
    res.status(201).json(newOptionValue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create option value', details: error });
  }
};

// Get all OptionValues
export const getOptionValues = async (req: Request, res: Response) => {
  try {
    const optionValues = await prisma.optionValue.findMany();
    res.status(200).json(optionValues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve option values', details: error });
  }
};

// Get a single OptionValue by ID
export const getOptionValueById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const optionValue = await prisma.optionValue.findUnique({
      where: { id: parseInt(id) },
    });
    if (!optionValue) {
      return res.status(404).json({ error: 'Option value not found' });
    }
    res.status(200).json(optionValue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve option value', details: error });
  }
};

// Update an OptionValue
export const updateOptionValue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    const updatedOptionValue = await prisma.optionValue.update({
      where: { id: parseInt(id) },
      data: { value },
    });
    res.status(200).json(updatedOptionValue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update option value', details: error });
  }
};

// Delete an OptionValue
export const deleteOptionValue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.optionValue.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // Successfully deleted the option value
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete option value', details: error });
  }
};
