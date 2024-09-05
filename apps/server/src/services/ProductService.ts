import { prisma } from "../lib/prismaClient";
import { Product } from "../models/Product";

interface IProductService {
    ListAsync(): void;
    FindByIdAsync(id: number): void;
    AddAsync(request: Product): void;
    UpdateAsync(id: number, request: Product): void;
    DeleteAsync(id: number): void;
}

export class ProductService implements IProductService {
    async AddAsync(request: Product) {
        let value = new Product({
            name: request.name,
            description: request.description,
            image: request.image
        })
        const product = await prisma.product.create({
            data: {
                name: value.name,
                description: value.description,
                image: request.image,
            }
        })
        return product

    }
    async UpdateAsync(id: number, request: Product) {
        const data = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if(data === null){
            throw new Error(`Product with Id ${id} not found`)
        }

        const updatedData = await prisma.product.update({
            where: {
                id: data.id
            },
            data: {
                name: request.name,
                description: request.description,
                image: request.image,
                updatedAt: new Date()
            }
        })
        return updatedData
    }

    async DeleteAsync(id: number) {
        const data = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (data === null) {
            throw new Error(`Product with Id ${id} not found`)
        }

        const product = await prisma.product.delete({
            where: {
                id: data.id
            }
        })
        return product
    }
    async ListAsync(): Promise<Product[]> {
        const products = await prisma.product.findMany()
        return products.map<Product>(product => ({
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            image: product.image ?? '',
        }))
    }

    async FindByIdAsync(id: number) {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                variants: true,
                collections: true
            }
        })
        return product
    }
}