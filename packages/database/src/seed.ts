import { PrismaClient } from './../prisma/prisma-client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'purple',
  'orange',
  'pink',
  'black',
  'white',
  'gray',
]

async function main() {
  // Seed Collections
  const collections = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.collection.create({
        data: {
          name: faker.commerce.department(),
          description: faker.lorem.sentence(),
        },
      }),
    ),
  )

  // Seed Products
  const products = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.lorem.paragraph(),
          image: faker.image.imageUrl(),
          collections: {
            connect: [
              {
                id: collections[Math.floor(Math.random() * collections.length)]
                  .id,
              },
            ],
          },
        },
      }),
    ),
  )

  // Seed Options and Variants for Products
  for (const product of products) {
    // Crear opciones para el producto
    await Promise.all(
      Array.from({ length: 2 }).map(() =>
        prisma.option.create({
          data: {
            name: faker.commerce.productAdjective(),
            Product: {
              connect: { id: product.id },
            },
            values: {
              create: Array.from({ length: 3 }).map(() => ({
                value: colors[Math.floor(Math.random() * colors.length)],
                variant: {
                  create: {
                    name: faker.commerce.productMaterial(),
                    description: faker.lorem.sentence(),
                    image: faker.image.imageUrl(),
                    sku: faker.datatype.uuid(),
                    price: parseFloat(faker.commerce.price()),
                    stock: faker.datatype.number({ min: 1, max: 100 }),
                    product: {
                      connect: { id: product.id },
                    },
                  },
                },
              })),
            },
          },
        }),
      ),
    )
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
