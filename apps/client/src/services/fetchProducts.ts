import { IProduct } from '../components/product/product.types'
import { fetchAPI } from '../utils/fetchAPI'

export const getProducts = async (params?: Record<string, unknown>) => {
  return fetchAPI<null, IProduct[], Record<string, unknown>>({
    method: 'GET',
    url: '/v1/products',
    params,
  })
}
