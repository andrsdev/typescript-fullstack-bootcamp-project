import { PrismaClient } from '@prisma/client'
import path from 'path'

const prisma = new PrismaClient()

async function main() {
  await cleanupDatabase()
  await addSeasonCollections()
  await addProductOptions()
  await addProducts()
  await addVariants()
}

async function cleanupDatabase() {
  // Explicitly delete data from each model
  await prisma.product.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.option.deleteMany()
  await prisma.optionValue.deleteMany()

  console.log('Database cleaned up')
}

async function addSeasonCollections() {
  const seasons: string[] = []
  for (let year = 2003; year <= 2014; year++) {
    seasons.push(`${year}/${year + 1}`)
  }

  for (const season of seasons) {
    await prisma.collection.create({
      data: {
        name: `FC Barcelona ${season} Season`,
        description: `Jerseys from the ${season} football season`
      }
    })
  }

  console.log('Season collections added')
}

async function addProductOptions() {
  await prisma.option.create({
    data: {
      name: 'Size',
      values: {
        create: ['S', 'M', 'L', 'XL', 'XXL'].map(size => ({ value: size }))
      }
    }
  })

  await prisma.option.create({
    data: {
      name: 'Jersey Type',
      values: {
        create: ['Home', 'Away', 'Third'].map(type => ({ value: type }))
      }
    }
  })

  console.log('Product options added')
}

async function addProducts() {
  const collections = await prisma.collection.findMany()
  const sizeOption = await prisma.option.findFirst({ where: { name: 'Size' } })
  const typeOption = await prisma.option.findFirst({ where: { name: 'Jersey Type' } })

  if (!sizeOption || !typeOption) {
    throw new Error('Size or Jersey Type option not found')
  }

  for (const collection of collections) {
    const seasonMatch = collection.name.match(/\d{4}\/\d{4}/)
    const season = seasonMatch ? seasonMatch[0] : null

    if (!season) {
      throw new Error('Season format not found')
    }

    const [startYear, endYear] = season.split('/')
    const jerseyTypes = ['Home', 'Away', 'Third']

    for (const type of jerseyTypes) {
      const imageFileName = `${startYear}-${endYear}-${type}.jpg`
      const imageUrl = getGithubRawUrl(imageFileName); // Static path served by Express

      await prisma.product.create({
        data: {
          name: `FC Barcelona ${type} Jersey ${season}`,
          description: `Official ${type} kit for FC Barcelona's ${season} season`,
          image: imageUrl, // Save the URL instead of the local path
          collections: {
            connect: { id: collection.id }
          },
          options: {
            connect: [
              { id: sizeOption.id },
              { id: typeOption.id }
            ]
          }
        }
      })
    }
  }

  console.log('Products added')
}
function getGithubRawUrl(imageName: string): string {
  const baseUrl = 'https://github.com/DiegoDubon31/TL-TSDB-W2/blob/main/images/';
  const rawUrl = baseUrl.replace('blob', 'raw'); // Convert blob to raw
  return `${rawUrl}${imageName}`;
}

async function addVariants() {
  const products = await prisma.product.findMany()
  const sizes = await prisma.optionValue.findMany({ where: { option: { name: 'Size' } } })
  const types = await prisma.optionValue.findMany({ where: { option: { name: 'Jersey Type' } } })

  for (const product of products) {
    const type = ['Home', 'Away', 'Third'].find(t => product.name.includes(t))

    if (!type) {
      throw new Error(`Type not found in product name: ${product.name}`)
    }

    const seasonMatch = product.name.match(/\d{4}\/\d{4}/)
    const season = seasonMatch ? seasonMatch[0] : null

    if (!season) {
      throw new Error('Season format not found')
    }

    const [startYear] = season.split('/')

    for (const size of sizes) {
      const foundType = types.find(t => t.value === type)

      if (!foundType) {
        throw new Error(`Type ${type} not found`)
      }

      // Generate a random price between 3000 (30$) and 8000 (80$)
      const randomPrice = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;

      await prisma.variant.create({
        data: {
          name: `${type} Jersey ${season} - ${size.value}`,
          sku: `FCB-${startYear}-${type.toUpperCase()}-${size.value}`,
          price: randomPrice, // Random price between 3000 and 8000
          stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10 and 59
          product: {
            connect: { id: product.id }
          },
          optionValues: {
            connect: [
              { id: size.id },
              { id: foundType.id }
            ]
          }
        }
      })
    }
  }

  console.log('Variants added')
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
