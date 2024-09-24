import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../services/ProductsService';
import { prisma } from '../lib/prismaClient';
import { Request, Response } from 'express';

// Mock the Prisma client
jest.mock('../lib/prismaClient', () => ({
  prisma: {
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

// Unit tests for product service
describe('Product Service', () => {
  
  // Test for createProduct
  it('should create a product successfully', async () => {
    const req = {
      body: { name: 'Test Product', description: 'Test Description', image: 'test-image.png' },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockProduct = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      image: 'test-image.png',
    };

    (prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);

    await createProduct(req, res);

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: {
        name: 'Test Product',
        description: 'Test Description',
        image: 'test-image.png',
      },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  // Test for getProducts
  it('should return a list of products', async () => {
    const req = { query: {} } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockProducts = [
      { id: 1, name: 'Product 1', description: 'Description 1', variants: [] },
      { id: 2, name: 'Product 2', description: 'Description 2', variants: [] },
    ];

    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

    await getProducts(req, res);

    expect(prisma.product.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });

  // Test for getProductById
  it('should return a single product by ID', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockProduct = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      image: 'test-image.png',
      variants: [],
    };

    (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);

    await getProductById(req, res);

    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { variants: true },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  // Test for updateProduct
  it('should update a product successfully', async () => {
    const req = {
      params: { id: '1' },
      body: { name: 'Updated Product', description: 'Updated Description', image: 'updated-image.png' },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const mockUpdatedProduct = {
      id: 1,
      name: 'Updated Product',
      description: 'Updated Description',
      image: 'updated-image.png',
    };

    (prisma.product.update as jest.Mock).mockResolvedValue(mockUpdatedProduct);

    await updateProduct(req, res);

    expect(prisma.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: 'Updated Product', description: 'Updated Description', image: 'updated-image.png' },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedProduct);
  });

  // Test for deleteProduct
  it('should delete a product successfully', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    (prisma.product.delete as jest.Mock).mockResolvedValue({});

    await deleteProduct(req, res);

    expect(prisma.product.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

});
