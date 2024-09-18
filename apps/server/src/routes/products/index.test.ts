import request from 'supertest'
import express from 'express'
import { productRouter } from './index'
import { ProductService } from '../../services/ProductService'

const app = express()

app.use('/api-v1', productRouter)

// jest.mock('../../services/ProductService', () => {
//   return {
//     ProductService: jest.fn().mockImplementation(() => {
//       return {
//         getProducts: jest.fn((sort) => {
//           if (sort.price === 'desc') {
//             return Promise.resolve([
//               {
//                 id: 2,
//                 name: 'Product 2',
//                 price: 200,
//               },
//               {
//                 id: 1,
//                 name: 'Product 1',
//                 price: 100,
//               },
//             ])
//           } else if (sort.price === 'asc') {
//             return Promise.resolve([
//               {
//                 id: 1,
//                 name: 'Product 1',
//                 price: 100,
//               },
//               {
//                 id: 2,
//                 name: 'Product 2',
//                 price: 200,
//               },
//             ])
//           }
//           return Promise.resolve([])
//         }),
//       }
//     }),
//   }
// })

jest.mock('../../services/ProductService', () => {
  return {
    ProductService: class mockProductService {
      getProducts = jest.fn((sort) => {
        if (sort.price === 'desc') {
          return Promise.resolve([
            {
              id: 2,
              name: 'Product 2',
              price: 200,
            },
            {
              id: 1,
              name: 'Product 1',
              price: 100,
            },
          ])
        } else if (sort.price === 'asc') {
          return Promise.resolve([
            {
              id: 1,
              name: 'Product 1',
              price: 100,
            },
            {
              id: 2,
              name: 'Product 2',
              price: 200,
            },
          ])
        } else if (sort.id == 'asc') {
          return Promise.resolve([
            {
              id: 1,
              name: 'Product 1',
              price: 100,
            },
            {
              id: 2,
              name: 'Product 2',
              price: 200,
            },
          ])
        }

        return Promise.resolve([])
      })
    },
  }
})

describe('GET /products', () => {
  test('should return all products', async () => {
    const response = await await request(app)
      .get('/api-v1/products')
      .query({ sort: 'asc' })
      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('result')
    expect(response.body.result).toEqual([
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ])
  })

  test('should return price high to low', async () => {
    const response = await request(app)
      .get('/api-v1/products')
      .query({ sort: 'high-to-low' })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('result')
    expect(response.body.result).toEqual([
      { id: 2, name: 'Product 2', price: 200 },
      { id: 1, name: 'Product 1', price: 100 },
    ])
  })
  test('should return price  low to high', async () => {
    const response = await request(app)
      .get('/api-v1/products')
      .query({ sort: 'low-to-high' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('result')
    expect(response.body.result).toEqual([
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ])
  })
})
