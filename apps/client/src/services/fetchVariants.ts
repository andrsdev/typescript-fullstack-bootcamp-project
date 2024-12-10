import { IVariant } from '../components/variant/variant.types'
import { fetchAPI } from '../utils/fetchAPI'

export const getVariants = async () => {
  return fetchAPI<null, IVariant[], Record<string, unknown>>({
    method: 'GET',
    url: '/v1/variants',
  })
}

export const getVariantsByProductId = async (
  productId: string,
  params?: Record<string, unknown>,
) => {
  return fetchAPI<null, IVariant[], Record<string, unknown>>({
    method: 'GET',
    url: `/v1/variants/product/${productId}`,
    params,
  })
}
