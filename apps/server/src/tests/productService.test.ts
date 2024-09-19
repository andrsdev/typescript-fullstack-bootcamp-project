import { ProductService } from './../services/ProductService';
import { prisma } from "../lib/prismaClient";
import Decimal from 'decimal.js';
import { parse } from 'date-fns';

jest.mock("../lib/prismaClient", () => ({
    prisma: {
        product: {
            findMany: jest.fn(),
            create: jest.fn(),
        },
    },
}));

describe('Products Service', () => {
    it('should return an empty list of products', async () => {
        const findManyMock = jest.mocked(prisma.product.findMany);
        findManyMock.mockResolvedValue([]);
        const productService = new ProductService();

        const response = await productService.ListAll();

        expect(response).toEqual([])
    }) 

    it('should create a new product', async () => {
        const createMock = jest.mocked(prisma.product.create);
        const newProduct ={
            id: 85,
            name: 'Test product',
            description: 'Description',
            price: new Decimal(10),
            image: 'https://via.placeholder.com/150',
            releaseDate: parse('22-05-2021','dd-MM-yyyy', new Date()),
            publisher: 'Publisher',
            developer: 'Developer',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const productService = new ProductService();
        createMock.mockResolvedValue(newProduct);

        const response = await productService.Add(newProduct);

        expect(response).toEqual(newProduct)
    })
})