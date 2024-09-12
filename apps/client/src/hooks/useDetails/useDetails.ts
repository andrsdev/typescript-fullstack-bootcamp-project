import { ListProductsResponse } from '@repo/shared'
import { useQuery } from '@tanstack/react-query'

export const useDetails = (id: number) => {
  const { data, error, isLoading } = useQuery<ListProductsResponse>({
    queryKey: ['product', id],
    queryFn: () => {
      return fetch(
        `http://localhost:5001/api-v1/products/product-by-id/${id}`,
      ).then((res) => res.json())
    },
  })

  return {
    data,
    error,
    isLoading,
  }
}
