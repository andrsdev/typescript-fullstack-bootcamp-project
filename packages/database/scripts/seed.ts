// import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';


export async function seed(prisma: PrismaClient) {
    // Insertar en Collection
    await prisma.collection.createMany({
        data: [
            { name: 'PlayStation 5', description: "The PlayStation 5's main hardware", manufacturer: 'Sony' },
            { name: 'Nintendo Switch', description: '', manufacturer: 'Nintendo' },
            { name: 'Xbox Series X/S', description: '', manufacturer: 'Microsoft' },
            { name: 'PlayStation 4', description: '', manufacturer: 'Sony' },
        ],
    });

    // Insertar en Genre
    await prisma.genre.createMany({
        data: [
            { name: 'Action' },
            { name: 'Adventure' },
            { name: 'Sports' },
            { name: 'RPG' },
            { name: 'Racing' },
            { name: 'Simulation' },
            { name: 'Party' },
        ],
    });

    // Insertar en Product
    const products = await prisma.product.createManyAndReturn({
        data: [
            { name: 'Super Mario Bros. Wonder', description: 'Classic Mario gameplay...', releaseDate: new Date('2024-09-11'), price: 59.99, image: 'https://media.gamestop.com/i/gamestop/20006717?$pdp2x$' },
            { name: 'The Legend of Zelda: Breath of the Wild', description: 'Step into a world of discovery...', releaseDate:  new Date('2024-09-11'), price: 69.99, image: 'https://media.gamestop.com/i/gamestop/20006805-2e0ec255?$pdp2x$' },
            { name: 'Gran Turismo 7', description: 'Gran Turismo returns with its signature...', releaseDate:  new Date('2024-09-11'), price: 69.99, image: 'https://media.gamestop.com/i/gamestop/20001188?$pdp2x$' },
            // Agrega los otros productos aquí
        ],
    });

    // Insertar en Variant dentro de product
    for (let i = products[0].id; i < products.length; i++) {
        await prisma.variant.createMany({
            data: [
                { name: 'Standard', price: 59.99, stock: faker.number.int({ min: 0, max: 150 }), productId: products[i].id },
                { name: 'Gold', price: 89.99, stock: faker.number.int({ min: 0, max: 150 }), productId: products[i].id },
                { name: 'Ultimate', price: 119.99, stock: faker.number.int({ min: 0, max: 150 }), productId: products[i].id },
            ],
        });
    }

}
