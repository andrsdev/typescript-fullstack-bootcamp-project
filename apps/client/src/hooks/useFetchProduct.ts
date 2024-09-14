import { useEffect, useState } from 'react'
import { getProduct } from '../helpers/getProduct'
import { Product } from '../interfaces/product.interface'

export const useFetchProduct = (id: number): Product[] => {
  const [product, setProduct] = useState<Product[]>([])

  useEffect(() => {
    const getProductAndVariants = async () => {
      const items = await getProduct(id)
      setProduct(items)
    }

    getProductAndVariants()
  }, [id])

  return product
}
