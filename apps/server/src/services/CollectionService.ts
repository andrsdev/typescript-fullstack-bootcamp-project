import { Collection } from "@repo/schemas";
import { prisma } from "../lib/prismaClient";


interface ICollectionService {
    ListAll(): void;
    GetById(id: number): void;
    Add(request: Collection): void;
    Update(id: number, request: Collection): void;
    Delete(id: number): void;
}

export class CollectionService implements ICollectionService {
    async ListAll() {
        const collections = await prisma.collection.findMany(
            {
                orderBy: {
                    name: 'asc'
                },
            }
        );
        return collections.map(collection => ({
            id: collection.id,
            name: collection.name,
            description: collection.description,
            manufacturer: collection.manufacturer,
        }));
    }
    async GetById(id: number) {
        const collection = await prisma.collection.findUnique({
            where: {
                id: id
            },
            include: {
                products: true
            }
        })

        if (collection === null) {
            return null;
        }

        const collectionFound: Collection = {
            id: collection.id,
            name: collection.name
        }

        return collectionFound
    }
    async Add(request: Collection) {
        const collection = await prisma.collection.create({
            data: {
                name: request.name,
                description: request.description,
                manufacturer: request.manufacturer,
                createdAt: new Date(),
            }
        })
        return collection;
    }

    async Update(id: number, request: Collection) {
        const collection = await prisma.collection.update({
            where: {
                id: id
            },
            data: {
                name: request.name,
                description: request.description,
                manufacturer: request.manufacturer,
                updatedAt: new Date(),
                products: {
                    connect:
                        request.products?.map(product => ({
                            id: product.id
                        }))
                }
            }
        })
    }
    async Delete(id: number) {
        const data = await prisma.collection.findUnique({
            where: {
                id: id
            }
        })
        if (data === null) {
            throw new Error(`Collection with id ${id} not found`)
        }
        const collection = await prisma.collection.delete({
            where: {
                id: data.id
            }
        })
        return collection
    }

}