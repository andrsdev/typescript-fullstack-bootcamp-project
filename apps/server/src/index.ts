import bodyParser from 'body-parser'
import express, { Request } from 'express'
import cors from 'cors'
import { PrismaClient } from '@repo/db'

const app = express()
const prisma = new PrismaClient()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

interface ProductParams {
  id: number
}

interface Variant {
  name: string
  description?: string
  image?: string
  stock: number
  price: number
}

interface Product {
  name: string
  description?: string
  image?: string
  price: number
  createdAt: string
  updatedAt: string
  variants: Variant[]
  collection: number
}

interface UpdateProduct {
  id: number
  name?: string
  description?: string
  image?: string
  price?: number
  updatedAt?: string
}

app.get('/', async (_, res) => {
  res.send({ message: 'Hello from Petshop API!' })
})

app.get('/product', async (_, res) => {
  const result = await prisma.product.findMany({
    include: {
      variants: true,
    },
  })
  return res.json({ result })
})

app.get('/product/:id', async (req: Request<ProductParams>, res) => {
  try {
    const productId = Number(req.params.id) || 0

    const result = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
      },
    })
    if (result === null) {
      return res
        .status(404)
        .send({ message: `Product with ID (${productId}) wasn't found.` })
    }
    return res.json({ result })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({ error: (e as Error).message })
  }
})

app.post('/product', async (req: Request<Product>, res) => {
  try {
    const product: Product = req.body

    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description || '',
        image: product.image || '',
        price: product.price,
        createdAt: new Date(product.createdAt).toISOString(),
        updatedAt: new Date(product.updatedAt).toISOString(),
      },
    })

    const productId = newProduct.id
    const variants = product.variants
    const variantsData = variants.map((v) => {
      return { ...v, productId }
    })

    await prisma.variant.createMany({
      data: [...variantsData],
    })

    const collectionId = Number(product.collection)

    await prisma.productCollection.create({
      data: {
        productId,
        collectionId,
      },
    })

    return res.json({ product: newProduct })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({ error: (e as Error).message })
  }
})

app.put('/product/:id', async (req: Request<UpdateProduct>, res) => {
  try {
    const productId = Number(req.params.id) || 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data }: UpdateProduct = req.body

    const updated = await prisma.product.update({
      where: {
        id: productId,
      },
      data: data,
    })

    return res.json({ product: updated })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({ error: (e as Error).message })
  }
})

app.delete('/product/:id', async (req: Request<ProductParams>, res) => {
  let productId = req.params.id || 0

  try {
    productId = Number(productId)
    const result = await prisma.product.delete({
      where: {
        id: productId,
      },
      include: {
        variants: true,
        collections: true,
      },
    })
    console.log(result)
    if (result === null) {
      return res.status(404).send({
        message: `Cannot delete Product with ID (${productId}) because doesn't exist.`,
      })
    }
    return res.json({ result })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({
      error: `Cannot delete Product with ID (${productId}) because doesn't exist.`,
    })
  }
})

const port = process.env.PORT || 5001

app.listen(port, () => {
  console.log(`Server API running on http://localhost:${port}`)
})
