import { Request, Response } from 'express';
import { prisma } from '../lib/prismaClient';


// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        image
      }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: error });
  }
};

// Get all products with search, collection filter, and sorting
// Get all products with search, collection filter, and sorting
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, collection, sort } = req.query;
    
    console.log('Query parameters:', { search, collection, sort });

    let where: any = {};

    // Handle search
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    // Handle collection filter
    if (collection) {
      where.collections = {
        some: { id: parseInt(collection as string) }
      };
    }

    console.log('Prisma query:', { where });

    // Fetch products without sorting first
    const products = await prisma.product.findMany({
      where,
      include: {
        variants: true,  // Include variants for sorting purposes
        collections: true
      }
    });

    console.log('Products fetched:', products.length);

    // Manual sorting based on variant price
    if (sort === 'price_asc' || sort === 'price_desc') {
      products.sort((a, b) => {
        const priceA = Math.min(...(a.variants.map(v => v.price) || [Infinity]));
        const priceB = Math.min(...(b.variants.map(v => v.price) || [Infinity]));
        return sort === 'price_asc' ? priceA - priceB : priceB - priceA;
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ error: 'Failed to retrieve products', details: JSON.stringify(error) });
  }
};



// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        variants: true,  // Include related variants in the response
      }
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product', details: error });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, image }
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error });
  }
};

// Delete a product without worrying about related collections being deleted
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Just delete the product
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // Successfully deleted the product
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', details: error });
  }
};
