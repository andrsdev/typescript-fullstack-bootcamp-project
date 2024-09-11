import { prisma } from "../lib/prismaClient";
import { Product } from "../models/Product";

export class ProductsService {

    // Get all products
    async getProducts() {
        return await prisma.product.findMany({
            include: {
                variants: true,
                collections: true,
            },
        });
    }

    // Obtiene un producto por ID
    async getProductById(productId: number) {
        try {
            const product = await prisma.product.findUnique({
                where: { id: productId },
                include: {
                    variants: true, // Incluye las variantes del producto, si tiene
                    collections: true, // Incluye las colecciones del producto, si hay
                },
            });

            return product;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw new Error('Error fetching product by ID');
        }
    }

    // Delete a product
    async deleteProduct(id: number){
        await prisma.product.delete({
            where: { id },
        });
    }

    // Create a new product
    async createProduct(productData: {
        name: string;
        description?: string;
        price: number;
        variants?: { name: string }[];
        collectionIds?: number[];
    }) {
        return await prisma.product.create({
            data: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                variants: {
                    create: productData.variants,
                },
                collections: {
                    connect: productData.collectionIds?.map(id => ({ id })),
                },
            },
            include: {
                variants: true,
                collections: true,
            },
        });
    }

    // Update an existing product
    async updateProduct(id: number, productData: {
        name?: string;
        description?: string;
        price?: number;
        variants?: { id?: number; name: string }[];
        collectionIds?: number[];
    }) {
        return await prisma.product.update({
            where: { id },
            data: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                variants: {
                    upsert: productData.variants?.map(variant => ({
                        where: { id: variant.id ?? 0 },
                        update: { name: variant.name },
                        create: { name: variant.name },
                    })),
                },
                collections: {
                    set: productData.collectionIds?.map(id => ({ id })),
                },
            },
            include: {
                variants: true,
                collections: true,
            },
        });
    }        
}
