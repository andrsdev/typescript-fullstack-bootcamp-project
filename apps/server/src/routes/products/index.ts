import { Router, Response, NextFunction } from 'express'
import { ProductService } from '../../services/ProductService'
import { sortProduct } from '@repo/shared'

export const productRouter: Router = Router()
const productService = new ProductService()

const productSortby: sortProduct = {
  PRICE_LOW_TO_HIGH: 'low-to-high',
  PRICE_HIGH_TO_LOW: 'high-to-low',
}
productRouter.get(
  '/products',
  async (req, res: Response, next: NextFunction) => {
    try {
      const sort = req.query.sort as string
      let orderBy = {}
      if (sort === productSortby.PRICE_LOW_TO_HIGH) {
        orderBy = {
          price: 'asc',
        }
      } else if (sort === productSortby.PRICE_HIGH_TO_LOW) {
        orderBy = {
          price: 'desc',
        }
      } else {
        orderBy = {
          id: 'asc',
        }
      }
      const result = await productService.getProducts(orderBy)
      return res.json({ result })
    } catch (error) {
      next(error)
    }
  },
)

productRouter.get('/products/product-by-id/:id', async (req, res, next) => {
  const { id } = req.params
  const productId = Number(id)
  try {
    const result = await productService.getProductById(productId)
    return res.json({ result })
  } catch (error) {
    next(error)
  }
})

productRouter.delete('/products/:id', async (req, res, next) => {
  const { id } = req.params
  const productId = Number(id)
  try {
    await productService.deleteProduct(productId)
    return res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    next(error)
  }
})

productRouter.post('/products', async (req, res, next) => {
  try {
    // Need to handle the image upload -  maybe it will be uploaded from local computer
    const { name, price, description } = req.body
    await productService.createProduct(name, price, description)
    return res.json({ message: 'Product created successfully' })
  } catch (error) {
    next(error)
  }
})

productRouter.put('/products/update', async (req, res, next) => {
  // Usage - http://localhost:5001/api-v1/products/update?product_id=17
  try {
    const productId = req.query.product_id

    if (!productId) {
      return res.status(400).json({ message: 'Product id is required' })
    }

    const { name, price, description } = req.body
    await productService.updateProduct(
      Number(productId),
      name,
      price,
      description,
    )
    return res.json({ message: 'Product updated successfully' })
  } catch (error) {
    next(error)
  }
})

productRouter.get('/products/search', async (req, res, next) => {
  // Usage - http://localhost:5001/api-v1/products/search?product_name=name
  try {
    const product_name = req.query.product_name

    if (!product_name) {
      return res.status(400).json({ message: 'Product is not in stock' })
    }

    const result = await productService.getProductByName(String(product_name))
    return res.json({ result })
  } catch (error) {
    next(error)
  }
})

productRouter.get('/products/collections', async (req, res, next) => {
  try {
    const collection_name = req.query.collection_name as string
    const sort = req.query.sort as string
    let orderBy = {}
    if (sort === productSortby.PRICE_LOW_TO_HIGH) {
      orderBy = {
        price: 'asc',
      }
    } else if (sort === productSortby.PRICE_HIGH_TO_LOW) {
      orderBy = {
        price: 'desc',
      }
    } else {
      orderBy = {
        id: 'asc',
      }
    }
    const result =
      collection_name === 'All'
        ? await productService.getProducts(orderBy)
        : await productService.getProductsByCollection(collection_name, orderBy)
    return res.json({ result })
  } catch (error) {
    next(error)
  }
})
