import request from 'supertest'
import app from '../index'
import { Server } from 'http'

describe('GET /api/product', () => {
  let server: Server

  beforeAll(() => {
    server = app.listen()
  })

  afterAll(() => {
    server.close()
  })

  test('Should respond with a list of products', async () => {
    const response = await request(app).get('/api/product')

    expect(response.status).toBe(200)
    expect(response.body.products.length).toBeGreaterThan(0)
  })
})
