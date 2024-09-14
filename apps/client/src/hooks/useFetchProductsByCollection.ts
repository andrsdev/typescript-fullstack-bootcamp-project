import { useEffect, useState } from 'react'
import { getProducts } from '../helpers/getProducts'

export const useFetchProducts = (
  collectionId: number,
  sort: string,
  name: string,
) => {
  const [products, setProducts] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)

  useEffect(() => {
    const getProductList = async () => {
      const productList = await getProducts(collectionId, sort, name)
      setProducts(productList)
      setIsLoadingProducts(false)
    }

    getProductList()
  }, [collectionId, sort, name])

  return {
    products,
    isLoadingProducts,
  }
}
