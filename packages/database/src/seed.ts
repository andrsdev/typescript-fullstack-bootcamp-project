import { PrismaClient } from '../prisma/prisma-client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'brown', 'black', 'white'];

async function main() {
  const collections = [];
  for (let i = 0; i < 5; i++) {
    const collection = await prisma.collection.create({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
        image: faker.image.url(),
      },
    });
    collections.push(collection);
  }

  console.log('Collections created:', collections);

  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        variants: {
          create: Array.from({ length: 3 }).map(() => ({
            name: faker.commerce.productAdjective(),
            sku: faker.string.uuid(), // Corrección de faker.datatype.uuid
            stock: faker.number.int({ min: 10, max: 100 }), // Corrección de faker.datatype.number
            price: parseFloat(faker.commerce.price()),
          })),
        },
        options: {
          create: [
            {
              name: 'Color',
              values: {
                create: colors.map((color) => ({ value: color })),
              },
            },
          ],
        },
        collections: {
          create: {
            collection: {
              connect: {
                id: collections[Math.floor(Math.random() * collections.length)].id,
              },
            },
          },
        },
      },
    });
    products.push(product);
  }

  console.log('Products with variants and options created:', products);
}

main()
  .catch((e) => {
    console.error('Error occurred:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
