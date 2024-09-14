import { Request, Response } from 'express'
import {
  createProduct,
  createProductCollection,
  createVariants,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCollection,
  updateProduct,
} from './product.model'
import {
  Product,
  ProductParams,
  ProductQuery,
  UpdateProduct,
} from '../interfaces/product.interface'

export async function listProducts(
  req: Request<object, object, object, ProductQuery>,
  res: Response,
) {
  const sort = req.query.sort || 'desc'
  const filter = req.query.name || ''

  const result = await getProducts(sort, filter)

  return res.json({ products: result })
}

export async function productById(req: Request<ProductParams>, res: Response) {
  try {
    const productId = Number(req.params.id) || 0

    const result = await getProductById(productId)

    if (result === null) {
      return res
        .status(404)
        .send({ message: `Product with ID (${productId}) wasn't found.` })
    }
    return res.json({ result: [result] })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({ error: (e as Error).message })
  }
}

export async function newProduct(req: Request<Product>, res: Response) {
  try {
    const product: Product = req.body

    const newProduct = await createProduct(product)
    const productId = newProduct.id

    const variants = product.variants
    await createVariants(productId, variants)

    const collectionId = Number(product.collection)
    await createProductCollection(productId, collectionId)

    return res.json({ product: newProduct })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({ error: (e as Error).message })
  }
}

export async function modifyProduct(
  req: Request<UpdateProduct>,
  res: Response,
) {
  try {
    const productId = Number(req.params.id) || 0

    const product: UpdateProduct = req.body

    const updated = await updateProduct(productId, product)

    return res.json({ product: updated })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({ error: (e as Error).message })
  }
}

export async function removeProduct(
  req: Request<ProductParams>,
  res: Response,
) {
  let productId = req.params.id || 0

  try {
    productId = Number(productId)
    const result = await deleteProduct(productId)
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
}

export async function listProductsByCollection(
  req: Request<ProductParams, object, object, ProductQuery>,
  res: Response,
) {
  try {
    const collectionId = Number(req.params.id) || 0
    const sort = req.query.sort
    const filter = req.query.name || ''

    console.log(filter)

    const result = await getProductsByCollection(collectionId, sort, filter)

    if (result === null) {
      return res.status(404).send({
        message: `Products of collection (${collectionId}) wasn't found.`,
      })
    }

    return res.json({ products: result })
  } catch (e) {
    console.log((e as Error).message)
    return res.status(409).send({ error: (e as Error).message })
  }
}
