import { PrismaClient } from '../prisma/prisma-client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();


async function main() {
    const collections = await Promise.all(
        Array.from({ length: 5 }).map(() =>
            prisma.collection.create({
                data: { name: faker.commerce.department(), description: faker.lorem.sentence() }
            }))
    );

    const products = await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.product.create({
                data: {
                    name: faker.commerce.productName(),
                    description: faker.lorem.sentence(),
                    image: faker.image.url(),
                    collections: {
                        connect:
                            collections.map((collection) => ({ id: collection.id }))
                    }
                }
            }))
    );

    // Crear opciones y asignar a productos
    const options = await Promise.all(
        products.map((product) =>
            prisma.option.create({
                data: {
                    productId: product.id,
                    name: faker.commerce.productMaterial(),
                }
            })
        )
    );

    // Crear opciones y valores para cada opción
    const optionValues = await Promise.all(
        options.map((option) =>
            Promise.all(
                Array.from({ length: 3 }).map(() =>
                    prisma.optionValue.create({
                        data: {
                            optionId: option.id,
                            value: faker.color.human(),
                        }
                    })
                )
            )
        )
    );

    // Crear variantes y asignar opciones y valores
    const variants = await Promise.all(
        products.map((product) =>
            prisma.variant.create({
                data: {
                    productId: product.id,
                    name: faker.commerce.productMaterial(),
                    sku: faker.commerce.isbn(),
                    price: parseFloat(faker.commerce.price({ min: 10, dec: 2 })),
                    stock: faker.number.int({ min: 0, max: 250 }),
                    optionValues: {
                        connect: optionValues.flat().map((value) => ({ id: value.id }))
                    }
                }
            })
        )
    );

    console.log('Database seeded!');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });