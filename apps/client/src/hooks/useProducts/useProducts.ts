import { useQuery } from '@tanstack/react-query'
import { ListProductsResponse } from '@repo/shared'
import { useState } from 'react'
export const useProducts = () => {
  const [searchProduct, setSearchProduct] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('All')
  const [sortOrder, setSortOrder] = useState('none')
  const { data, isLoading, isError } = useQuery<ListProductsResponse>({
    queryKey: ['products', searchProduct, selectedCollection, sortOrder],
    queryFn: () => {
      let url =
        selectedCollection === 'All'
          ? `http://localhost:5001/api-v1/products?sort=${sortOrder}`
          : `http://localhost:5001/api-v1/products/collections?collection_name=${selectedCollection}&sort=${sortOrder}`

      if (searchProduct) {
        url = `http://localhost:5001/api-v1/products/search?product_name=${searchProduct}`
      }
      return fetch(url).then((res) => res.json())
    },
    placeholderData: (previousData) => previousData,
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value)
  }

  return {
    data,
    isLoading,
    isError,
    handleSearch,
    searchProduct,
    selectedCollection,
    setSelectedCollection,
    sortOrder,
    setSortOrder,
  }
}
