import { useQuery } from '@tanstack/react-query'
import { CollectionProductResponse } from '@repo/shared'

export const useCollection = () => {
  const {
    data: colleData,
    error: collError,
    isLoading: collLoading,
  } = useQuery<CollectionProductResponse>({
    queryKey: ['collections'],
    queryFn: () => {
      return fetch(`http://localhost:5001/api-v1/collections`).then((res) =>
        res.json(),
      )
    },
  })

  const collections = [
    'All',
    ...(colleData?.result.map((collection) => collection.name) ?? []),
  ]

  return {
    colleData,
    collError,
    collLoading,
    collections,
  }
}
