import { Router, Response, NextFunction } from 'express'
import { ProductService } from '../../services/ProductService'

export const productRouter: Router = Router()
const productService = new ProductService()

productRouter.get('/products', async (_, res: Response, next: NextFunction) => {
  try {
    const result = await productService.getProducts()
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
