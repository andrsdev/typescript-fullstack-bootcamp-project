import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import { IVariant } from './variant.types'
import { getVariantsByProductId } from '../../services/fetchVariants'
import { useSearch } from '../../hooks/useSearch'
import CategoriesSideBar from '../global/CategoriesSideBar/CategoriesSideBar'

const Variant = () => {
  const [variants, setVariants] = useState<IVariant[]>([])
  const [error, setError] = useState<string | null>(null)
  const { productId } = useParams({ from: '/products/$productId' })
  const { path, searchTerm } = useSearch()
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] =
    useState<string>('Price: High to low')

  useEffect(() => {
    const loadVariants = async () => {
      try {
        const filters = ['Price: High to low', 'Price: Low to high']
        setCategories(filters)

        const params = {}

        if (searchTerm) {
          if (path.includes('/products/')) {
            Object.assign(params, {
              name: searchTerm,
            })
          }
        }

        if (selectedCategory.includes('High to low')) {
          Object.assign(params, {
            sortByPrice: 'desc',
          })
        }

        const data = await getVariantsByProductId(productId, params)

        setVariants(data)
      } catch (err: unknown) {
        setError('Error loading products')
      }
    }

    loadVariants()
  }, [productId, path, searchTerm, selectedCategory])

  if (error) {
    return (
      <div className="container mx-auto min-h-screen p-8 mt-16">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen p-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <CategoriesSideBar
          name="Sort by"
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
        <section className="md:col-span-3">
          <h1>Variants</h1>
          <br />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {variants.map((item, index) => (
              <div
                key={index}
                className="bg-black text-white p-4 rounded-lg shadow-lg hover:cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto rounded-md"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-lg font-normal">{item.description}</p>
                  <p className="text-lg font-semibold">{`$ ${item.price.toFixed(2)} USD`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Variant
