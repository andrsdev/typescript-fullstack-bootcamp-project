import request from 'supertest'
import express from 'express'
import routerAPI from './../../routes/index'
import { findProduct } from './product.service'

jest.mock('./product.service', () => ({
  findProduct: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}))

const app = express()

app.use('/api', routerAPI)

describe('GET /api/v1/products', () => {
  it('should return all products', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    ;(findProduct as jest.Mock).mockResolvedValue(mockProducts)

    const response = await request(app).get('/api/v1/products')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockProducts)
  })

  it('should return products filtered by name', async () => {
    const mockProducts = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    ;(findProduct as jest.Mock).mockResolvedValue(mockProducts)

    const response = await request(app)
      .get('/api/v1/products')
      .query({ name: 'Product 1' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(mockProducts)
  })
})
