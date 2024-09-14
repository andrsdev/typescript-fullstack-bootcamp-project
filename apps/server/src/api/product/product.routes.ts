import express, { Router } from 'express'
import {
  listProducts,
  listProductsByCollection,
  modifyProduct,
  newProduct,
  productById,
  removeProduct,
} from './product.controller'

const productRouter: Router = express.Router()

productRouter.get('/', listProducts)
productRouter.get('/:id', productById)
productRouter.post('/', newProduct)
productRouter.put('/:id', modifyProduct)
productRouter.delete('/:id', removeProduct)
productRouter.get('/collection/:id', listProductsByCollection)

export default productRouter
