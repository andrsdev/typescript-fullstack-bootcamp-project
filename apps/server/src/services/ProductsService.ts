import { Product } from "@repo/db";
import { prisma } from "../lib/prismaClient";


export class ProducsService {
    async getAllProducts(): Promise<Product[]> {
        const products = await prisma.product.findMany()

        return products.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            image: product.image ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }))

    }

    // create product
    async createProduct(data: Omit<Product, 'id'>): Promise<Product> {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
            }
        })

        return {
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            image: product.image ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }

    // update product
    async updateProduct(id: number, data: Omit<Product, 'id'>): Promise<Product> {
        const productId = id; // Convert id from string to number
        const product = await prisma.product.update({
            where: { id: productId }, // Use the converted id
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
            }
        })
    
        return {
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            image: product.image ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }

    // delete product
    async deleteProduct(id: number): Promise<Product> {
        const productId = id;
    
        // Eliminar todas las variantes asociadas al producto
        await prisma.variant.deleteMany({
            where: { productId: productId }
        });
    
        // Encontrar todas las opciones asociadas al producto
        const options = await prisma.option.findMany({
            where: { productId: productId }
        });
    
        // Eliminar todos los valores de las opciones asociadas
        const optionIds = options.map(option => option.id); // Obtener los IDs de las opciones
        if (optionIds.length > 0) {
            await prisma.optionValue.deleteMany({
                where: {
                    optionId: { in: optionIds }  // Eliminar todos los OptionValue relacionados con estas opciones
                }
            });
        }
    
        // Eliminar todas las opciones asociadas al producto
        await prisma.option.deleteMany({
            where: { productId: productId }
        });
    
        // Finalmente, eliminar el producto
        const product = await prisma.product.delete({
            where: { id: productId }
        });
    
        return {
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            image: product.image ?? '',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
    


}

