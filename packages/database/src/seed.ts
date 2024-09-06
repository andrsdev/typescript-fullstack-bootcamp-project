import { Collection, PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Create Collections
  const collections: Collection[] = []
  for (let i = 0; i < 3; i++) {
    const collection = await prisma.collection.create({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.sentence(),
      },
    })
    collections.push(collection)
  }

  // Create Products with Variants
  for (let i = 0; i < 5; i++) {
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
        price: parseFloat(faker.commerce.price(50, 300)),
        variants: {
          create: Array.from({ length: 3 }, () => ({
            size: faker.helpers.arrayElement(['7', '8', '9', '10', '11']),
            color: faker.color.human(),
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

    // Optionally, connect the product to another collection
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

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    // process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
