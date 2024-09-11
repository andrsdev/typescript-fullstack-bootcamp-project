
import { Genre, GenreDtoResponse, ProductDtoResponse } from "@repo/schemas";
import { prisma } from "../lib/prismaClient";

interface IGenreService {
    ListAll(): void;
    GetById(id: number): void;
    Add(request: Genre): void;
    Update(id: number, request: Genre): void;
    Delete(id: number): void;
}

export class GenreService implements IGenreService {
    async ListAll() {
        const genres = await prisma.genre.findMany();
        return genres.map(genre => ({
            id: genre.id,
            name: genre.name,
        }));
    }

    async GetById(id: number) {
        const genre = await prisma.genre.findUnique({
            where: {
                id: id
            },
            include: {
                products: true
            }
        })

        if (genre === null) {
            return null;
        }

        const genreFound: GenreDtoResponse = {
            id: genre.id,
            name: genre.name,
            products: genre.products.map(product => ({
                id: product.id,
                name: product.name,
                releaseDate: product.releaseDate,

            }))
        }

        return genreFound;


    }

    async Add(request: Genre) {
        const genre = await prisma.genre.create({
            data: {
                name: request.name,
                createdAt: new Date(),
                products: {
                    connect:
                        request.products?.map(product => ({
                            id: product.id
                        }))
                }
            }

        });

        return genre;
    }



    async Update(id: number, request: Genre) {
        const data = await prisma.genre.findUnique({
            where: {
                id: id
            }
        })

        if (data === null) {
            throw new Error(`Product with id ${id} not found`)
        }

        const updatedData = await prisma.genre.update({
            where: {
                id: data.id
            },
            data: {
                name: request.name,
                products: {
                    connect:
                        request.products?.map(product => ({
                            id: product.id
                        }))
                },
                updatedAt: new Date()
            }
        }
        )
        return updatedData
    }
    Delete(id: number): void {
        throw new Error("Method not implemented.");
    }

}