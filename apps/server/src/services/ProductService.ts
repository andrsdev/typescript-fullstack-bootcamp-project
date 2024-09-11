import { ProductDtoRequest } from './../../../../packages/schemas/src/dtos/request/ProductDtoRequest';
import { prisma } from "../lib/prismaClient";
import { Product, ProductDtoResponse } from "@repo/schemas";
import { format, parse } from 'date-fns'

interface IProductService {
    ListAll(): void;
    GetById(id: number): void;
    Add(request: ProductDtoRequest): void;
    Update(id: number, request: ProductDtoRequest): void;
    Delete(id: number): void;
}

export class ProductService implements IProductService {
    async Add(request: ProductDtoRequest) {
        const product = await prisma.product.create({
            data: {
                name: request.name,
                description: request.description,
                image: request.image,
                releaseDate: parse(request.releaseDate.toString(), 'dd-MM-yyyy', new Date()),
                developer: request.developer,
                publisher: request.publisher,
                createdAt: new Date(),
                genres: {
                    connect:
                        request.genres?.map(genre => ({
                            id: genre.id
                        }))
                },
                variants: {
                    connect:
                        request.variants?.map(variant => ({
                            id: variant.id
                        }))
                },
                collections: {
                    connect:
                        request.collections?.map(collection => ({
                            id: collection.id
                        }))
                }
            }
        })
        return product

    }
    
    async Update(id: number, request: ProductDtoRequest) {
        const data = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (data === null) {
            throw new Error(`Product with id ${id} not found`)
        }

        const updatedData = await prisma.product.update({
            where: {
                id: data.id
            },
            data: {
                name: request.name,
                description: request.description,
                image: request.image,
                releaseDate: parse(request.releaseDate.toString(), 'dd-MM-yyyy', new Date()),
                developer: request.developer,
                publisher: request.publisher,
                updatedAt: new Date(),
                genres: {
                    connect:
                        request.genres?.map(genre => ({
                            id: genre.id
                        }))
                },
                variants: {
                    connect:
                        request.variants?.map(variant => ({
                            id: variant.id
                        }))
                },
                collections: {
                    connect:
                        request.collections?.map(collection => ({
                            id: collection.id
                        }))
                }
            }
        })
        return updatedData
    }

    async Delete(id: number) {
        const data = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        if (data === null) {
            throw new Error(`Product with id ${id} not found`)
        }

        const product = await prisma.product.delete({
            where: {
                id: data.id
            }
        })
        return product
    }
    async ListAll(): Promise<ProductDtoResponse[]> {
        const products = await prisma.product.findMany()
        return products.map(product => ({
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            image: product.image ?? '',
            releaseDate: format(product.releaseDate, 'dd-MM-yyyy'),
            developer: product.developer,
            publisher: product.publisher,

        }))
    }

    async GetById(id: number) {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            },
            include: {
                genres: true,
                variants: true,
                collections: true
            }
        })

        if (product === null) {
            return null
        }

        const productFound: ProductDtoResponse = {
            id: product.id,
            name: product.name,
            description: product.description ?? '',
            image: product.image ?? '',
            genres: product.genres,
            releaseDate: format(product.releaseDate, 'dd-MM-yyyy'),
            developer: product.developer,
            publisher: product.publisher,
            variants: product.variants,
            collections: product.collections,

        }
        return productFound
    }
}