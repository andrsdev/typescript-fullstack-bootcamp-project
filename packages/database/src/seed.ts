import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Step 1: Seed Collections
  const collections = await prisma.collection.createMany({
    data: Array.from({ length: 3 }, () => ({
      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
    })),
  });

  // Step 2: Create 10 products with options and link to collections randomly
  for (let i = 0; i < 10; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.url(),
        options: {
          create: [
            {
              name: 'Color',
              values: {
                create: ['Red', 'Green', 'Blue'].map((value) => ({ value })),
              },
            },
            {
              name: 'Size',
              values: {
                create: ['S', 'M', 'L'].map((value) => ({ value })),
              },
            },
          ],
        },
        // Assign product to a random collection
        collections: {
          connect: {
            id: faker.helpers.arrayElement([1, 2, 3]), // Assuming 3 collections
          },
        },
      },
      include: {
        options: {
          include: {
            values: true,
          },
        },
      },
    });

    // Step 3: Create Variants for the Product
    const variants = await prisma.variant.createManyAndReturn({
      data: [
        {
          productId: product.id,
          name: 'Red-S',
          description: faker.commerce.productDescription(),
          image: faker.image.url(),
          sku: faker.datatype.uuid(),
          price: faker.datatype.number({ min: 1000, max: 5000 }),
          stok: faker.datatype.number({ min: 1, max: 100 }),
        },
        {
          productId: product.id,
          name: 'Green-M',
          description: faker.commerce.productDescription(),
          image: faker.image.url(),
          sku: faker.datatype.uuid(),
          price: faker.datatype.number({ min: 1000, max: 5000 }),
          stok: faker.datatype.number({ min: 1, max: 100 }),
        },
      ],
    });

    // Step 4: Link Variants to the corresponding OptionValues
    const optionValues = product.options.flatMap((option) =>
      option.values.map((value) => ({
        optionId: option.id,
        value: value.value,
      }))
    );

    await Promise.all(
      variants.map(async (variant, index) => {
        await prisma.optionValue.update({
          where: {
            id: optionValues[index % optionValues.length].id, // Assign values in a round-robin fashion
          },
          data: {
            Variant: {
              connect: { id: variant.id },
            },
          },
        });
      })
    );
  }

  console.log('Database seeded successfully!');
}

// Execute seeding
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
