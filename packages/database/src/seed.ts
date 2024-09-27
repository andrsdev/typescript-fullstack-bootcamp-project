import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create Collections
  const collections = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.collection.create({
        data: {
          name: faker.commerce.department(),
        },
      })
    )
  );

  // Create Products and Variants
  await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          collections: {
            connect: collections.map((collection) => ({
              id: collection.id,
            })),
          },
        },
      });

      await prisma.variant.createMany({
        data: Array.from({ length: 3 }).map(() => ({
          name: faker.color.human(),
          productId: product.id,
        })),
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
