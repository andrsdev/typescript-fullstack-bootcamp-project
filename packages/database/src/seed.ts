import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crear colecciones
  const dogCollection = await prisma.collection.create({
    data: {
      name: 'Dog Products',
      description: 'Everything for your dog',
    },
  })

  const catCollection = await prisma.collection.create({
    data: {
      name: 'Cat Products',
      description: 'Everything for your cat',
    },
  })

  // Crear productos para la colección de perros
  const dogProducts = await prisma.product.createMany({
    data: [
      {
        name: 'Dog Leash',
        description: 'A durable leash for dogs',
        image: 'dog-leash.png',
        price: 15.99,
      },
      {
        name: 'Dog Collar',
        description: 'Comfortable collar for dogs',
        image: 'dog-collar.png',
        price: 12.99,
      },
      {
        name: 'Dog Bed',
        description: 'A cozy bed for your dog',
        image: 'dog-bed.png',
        price: 39.99,
      },
      {
        name: 'Dog Shampoo',
        description: 'Shampoo to keep your dog clean',
        image: 'dog-shampoo.png',
        price: 9.99,
      },
      {
        name: 'Dog Toy',
        description: 'A fun toy for dogs',
        image: 'dog-toy.png',
        price: 7.99,
      },
    ],
  })

  // Variantes para cada producto de perro
  const dogVariants = await prisma.variant.createMany({
    data: [
      {
        name: 'Small Dog Leash',
        description: 'Leash for small dogs',
        image: 'small-dog-leash.png',
        stock: 50,
        price: 14.99,
        productId: 1,
      },
      {
        name: 'Large Dog Leash',
        description: 'Leash for large dogs',
        image: 'large-dog-leash.png',
        stock: 30,
        price: 17.99,
        productId: 1,
      },
      {
        name: 'Small Dog Collar',
        description: 'Collar for small dogs',
        image: 'small-dog-collar.png',
        stock: 60,
        price: 11.99,
        productId: 2,
      },
      {
        name: 'Large Dog Collar',
        description: 'Collar for large dogs',
        image: 'large-dog-collar.png',
        stock: 40,
        price: 13.99,
        productId: 2,
      },
      {
        name: 'Small Dog Bed',
        description: 'Bed for small dogs',
        image: 'small-dog-bed.png',
        stock: 20,
        price: 34.99,
        productId: 3,
      },
      {
        name: 'Large Dog Bed',
        description: 'Bed for large dogs',
        image: 'large-dog-bed.png',
        stock: 15,
        price: 44.99,
        productId: 3,
      },
      {
        name: 'Dog Shampoo - Sensitive Skin',
        description: 'Shampoo for sensitive skin',
        image: 'dog-shampoo-sensitive.png',
        stock: 80,
        price: 10.99,
        productId: 4,
      },
      {
        name: 'Dog Shampoo - Regular',
        description: 'Regular shampoo',
        image: 'dog-shampoo-regular.png',
        stock: 90,
        price: 9.49,
        productId: 4,
      },
      {
        name: 'Rubber Dog Toy',
        description: 'Durable rubber toy',
        image: 'rubber-dog-toy.png',
        stock: 100,
        price: 8.99,
        productId: 5,
      },
      {
        name: 'Plastic Dog Toy',
        description: 'Plastic toy for dogs',
        image: 'plastic-dog-toy.png',
        stock: 110,
        price: 7.49,
        productId: 5,
      },
    ],
  })

  // Crear productos para la colección de gatos
  const catProducts = await prisma.product.createMany({
    data: [
      {
        name: 'Cat Toy',
        description: 'A fun toy for cats',
        image: 'cat-toy.png',
        price: 9.99,
      },
      {
        name: 'Cat Bed',
        description: 'A cozy bed for your cat',
        image: 'cat-bed.png',
        price: 29.99,
      },
      {
        name: 'Cat Scratcher',
        description: 'Scratcher to keep your cat entertained',
        image: 'cat-scratcher.png',
        price: 19.99,
      },
      {
        name: 'Cat Litter',
        description: 'Litter for your cat',
        image: 'cat-litter.png',
        price: 14.99,
      },
      {
        name: 'Cat Collar',
        description: 'Comfortable collar for cats',
        image: 'cat-collar.png',
        price: 11.99,
      },
    ],
  })

  // Variantes para cada producto de gato
  const catVariants = await prisma.variant.createMany({
    data: [
      {
        name: 'Feather Cat Toy',
        description: 'Toy with feathers for cats',
        image: 'feather-cat-toy.png',
        stock: 100,
        price: 9.49,
        productId: 6,
      },
      {
        name: 'Ball Cat Toy',
        description: 'Toy ball for cats',
        image: 'ball-cat-toy.png',
        stock: 70,
        price: 8.99,
        productId: 6,
      },
      {
        name: 'Small Cat Bed',
        description: 'Bed for small cats',
        image: 'small-cat-bed.png',
        stock: 50,
        price: 27.99,
        productId: 7,
      },
      {
        name: 'Large Cat Bed',
        description: 'Bed for large cats',
        image: 'large-cat-bed.png',
        stock: 30,
        price: 32.99,
        productId: 7,
      },
      {
        name: 'Cat Scratcher - Small',
        description: 'Small scratcher for cats',
        image: 'small-cat-scratcher.png',
        stock: 40,
        price: 18.49,
        productId: 8,
      },
      {
        name: 'Cat Scratcher - Large',
        description: 'Large scratcher for cats',
        image: 'large-cat-scratcher.png',
        stock: 25,
        price: 21.99,
        productId: 8,
      },
      {
        name: 'Clumping Cat Litter',
        description: 'Clumping litter for cats',
        image: 'clumping-cat-litter.png',
        stock: 60,
        price: 16.99,
        productId: 9,
      },
      {
        name: 'Non-Clumping Cat Litter',
        description: 'Non-clumping litter for cats',
        image: 'non-clumping-cat-litter.png',
        stock: 55,
        price: 13.49,
        productId: 9,
      },
      {
        name: 'Reflective Cat Collar',
        description: 'Reflective collar for cats',
        image: 'reflective-cat-collar.png',
        stock: 80,
        price: 12.49,
        productId: 10,
      },
      {
        name: 'Breakaway Cat Collar',
        description: 'Breakaway collar for cats',
        image: 'breakaway-cat-collar.png',
        stock: 70,
        price: 11.49,
        productId: 10,
      },
    ],
  })

  // Asociar productos con colecciones
  const dogProductAssociations = await prisma.productCollection.createMany({
    data: [
      { productId: 1, collectionId: dogCollection.id },
      { productId: 2, collectionId: dogCollection.id },
      { productId: 3, collectionId: dogCollection.id },
      { productId: 4, collectionId: dogCollection.id },
      { productId: 5, collectionId: dogCollection.id },
    ],
  })

  const catProductAssociations = await prisma.productCollection.createMany({
    data: [
      { productId: 6, collectionId: catCollection.id },
      { productId: 7, collectionId: catCollection.id },
      { productId: 8, collectionId: catCollection.id },
      { productId: 9, collectionId: catCollection.id },
      { productId: 10, collectionId: catCollection.id },
    ],
  })

  console.log({
    dogCollection,
    catCollection,
    dogProducts,
    catProducts,
    dogVariants,
    catVariants,
    dogProductAssociations,
    catProductAssociations,
  })
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
