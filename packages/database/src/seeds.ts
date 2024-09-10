import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Collections
  await prisma.variant.deleteMany({});
  await prisma.optionValue.deleteMany({});
  await prisma.option.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.collection.deleteMany({});

  console.log('Existing data cleared.');
  const collections = await prisma.collection.createMany({
    data: [
      { name: 'Soccer Collection', description: 'T-shirts and jerseys for soccer enthusiasts.' },
      { name: 'Basketball Collection', description: 'Stylish t-shirts for basketball fans.' },
      { name: 'Baseball Collection', description: 'Casual wear for baseball lovers.' },
    ],
  });

  console.log(`Inserted ${collections.count} collections`);

  // Fetch collections to get their IDs
  const [soccerCollection, basketballCollection, baseballCollection] = await prisma.collection.findMany();

  // Create Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Soccer T-shirt',
        description: 'High-quality t-shirt for soccer fans.',
        image: 'soccer_tshirt.png',
      },
      {
        name: 'Basketball T-shirt',
        description: 'Comfortable t-shirt for basketball games.',
        image: 'basketball_tshirt.png',
      },
      {
        name: 'Baseball T-shirt',
        description: 'Stylish t-shirt for baseball fans.',
        image: 'baseball_tshirt.png',
      },
    ],
  });

  console.log(`Inserted ${products.count} products`);

  // Fetch products to get their IDs
  const [soccerProduct, basketballProduct, baseballProduct] = await prisma.product.findMany();

  // Connect products to their collections
  await prisma.collection.update({
    where: { id: soccerCollection.id },
    data: { products: { connect: { id: soccerProduct.id } } },
  });

  await prisma.collection.update({
    where: { id: basketballCollection.id },
    data: { products: { connect: { id: basketballProduct.id } } },
  });

  await prisma.collection.update({
    where: { id: baseballCollection.id },
    data: { products: { connect: { id: baseballProduct.id } } },
  });

  // Create Options and Option Values
  const sizeOption = await prisma.option.create({
    data: {
      name: 'Size',
      product: { connect: { id: soccerProduct.id } },
      values: {
        create: [{ value: 'Small' }, { value: 'Medium' }, { value: 'Large' }],
      },
    },
  });

  const colorOption = await prisma.option.create({
    data: {
      name: 'Color',
      product: { connect: { id: basketballProduct.id } },
      values: {
        create: [{ value: 'Red' }, { value: 'Blue' }, { value: 'Green' }],
      },
    },
  });

  // Fetch option values to get their IDs
  const sizeValues = await prisma.optionValue.findMany({ where: { optionId: sizeOption.id } });
  const colorValues = await prisma.optionValue.findMany({ where: { optionId: colorOption.id } });

  // Create Variants and link them with option values
  await prisma.variant.create({
    data: {
      name: 'Soccer T-shirt - Small',
      product: { connect: { id: soccerProduct.id } },
      sku: 'SOCCER-SM',
      price: 19.99,
      stock: 100,
      optionValues: { connect: [{ id: sizeValues[0].id }] },
    },
  });

  await prisma.variant.create({
    data: {
      name: 'Basketball T-shirt - Red',
      product: { connect: { id: basketballProduct.id } },
      sku: 'BASKETBALL-RED',
      price: 24.99,
      stock: 50,
      optionValues: { connect: [{ id: colorValues[0].id }] },
    },
  });

  await prisma.variant.create({
    data: {
      name: 'Baseball T-shirt - Medium',
      product: { connect: { id: baseballProduct.id } },
      sku: 'BASEBALL-MD',
      price: 22.99,
      stock: 75,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
