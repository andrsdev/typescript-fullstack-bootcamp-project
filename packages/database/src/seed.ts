import { PrismaClient, Collection } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Create Collections related to shoes
  const collections: Collection[] = []
  const collectionNames = ['Sneakers', 'Formal Shoes', 'Sandals']
  for (let i = 0; i < collectionNames.length; i++) {
    const collection = await prisma.collection.create({
      data: {
        name: collectionNames[i],
        description: faker.lorem.sentence(),
      },
    })
    collections.push(collection)
  }

  // Create Shoe Products with Variants
  for (let i = 0; i < 5; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.helpers.arrayElement([
          'Air Max 270',
          'Classic Leather',
          'Chelsea Boots',
          'Canvas Slip-Ons',
          'Running Shoes',
        ]),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(640, 480, 'shoes', true), // Image related to shoes
        price: parseFloat(faker.commerce.price(50, 300)),
        variants: {
          create: Array.from({ length: 3 }, () => ({
            size: faker.helpers.arrayElement(['7', '8', '9', '10', '11']),
            color: faker.helpers.arrayElement([
              'Red',
              'Blue',
              'Black',
              'White',
            ]),
            stock: faker.datatype.number({ min: 1, max: 100 }),
            sku: faker.datatype.uuid(),
          })),
        },
        collections: {
          connect: [
            { id: collections[faker.datatype.number({ min: 0, max: 2 })].id },
          ],
        },
      },
    })

    // Optionally, connect the product to another shoe-related collection
    if (faker.datatype.boolean()) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          collections: {
            connect: [
              { id: collections[faker.datatype.number({ min: 0, max: 2 })].id },
            ],
          },
        },
      })
    }
  }

  console.log('Shoe-related seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
