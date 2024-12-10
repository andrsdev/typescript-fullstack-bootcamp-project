import { ICollection } from '../components/collection/collection.types'
import { fetchAPI } from '../utils/fetchAPI'

export const getCollections = async (params?: Record<string, unknown>) => {
  return fetchAPI<null, ICollection[], Record<string, unknown>>({
    method: 'GET',
    url: '/v1/collections',
    params,
  })
}
