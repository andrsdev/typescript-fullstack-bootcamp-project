import { getProducts } from './fetchProducts'
import { fetchAPI } from '../utils/fetchAPI'
import { IProduct } from '../components/product/product.types'

jest.mock('../utils/fetchAPI', () => ({
  fetchAPI: jest.fn(),
}))

describe('getProducts', () => {
  const mockResponse: IProduct[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      image: 'https://via.placeholder.com/150',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      image: 'https://via.placeholder.com/150',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
  ]

  it('fetches products successfully with name parameter', async () => {
    ;(fetchAPI as jest.Mock).mockResolvedValue(mockResponse)

    const params = { name: 'Product 1' }

    const result = await getProducts(params)

    expect(fetchAPI).toHaveBeenCalledWith({
      method: 'GET',
      url: '/v1/products',
      params,
    })

    expect(result).toEqual(mockResponse)
  })

  it('fetches products successfully without parameters', async () => {
    ;(fetchAPI as jest.Mock).mockResolvedValue(mockResponse)

    const result = await getProducts()

    expect(fetchAPI).toHaveBeenCalledWith({
      method: 'GET',
      url: '/v1/products',
      params: undefined,
    })

    expect(result).toEqual(mockResponse)
  })

  it('handles API errors', async () => {
    ;(fetchAPI as jest.Mock).mockRejectedValue(new Error('Failed to fetch'))

    const params = { name: 'Product 1' }

    await expect(getProducts(params)).rejects.toThrow('Failed to fetch')
  })
})
