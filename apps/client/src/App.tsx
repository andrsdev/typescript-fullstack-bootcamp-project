import './index.css'
import { useEffect, useState } from 'react'
import Product from './components/product/Product'
import { Link } from '@tanstack/react-router'
import { IProduct } from './components/product/product.types'
import { getProducts } from './services/fetchProducts'
import { useSearch } from './hooks/useSearch'
import { getCollections } from './services/fetchCollections'
import CategoriesSideBar from './components/global/CategoriesSideBar/CategoriesSideBar'

function App() {
  const { path, searchTerm } = useSearch()
  const [products, setProducts] = useState<IProduct[]>([])
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const data = await getCollections()
        const nameList = data.map((item) => item.name)
        nameList.unshift('All')
        setCategories(nameList)
      } catch (error: unknown) {
        setError('Error loading categories')
      }
    }
    const loadProducts = async () => {
      try {
        const params = {}

        if (searchTerm) {
          if (path.includes('/') || path.includes('/products')) {
            Object.assign(params, {
              name: searchTerm,
            })
          }
        }

        if (selectedCategory && selectedCategory !== 'All') {
          Object.assign(params, {
            collectionName: selectedCategory,
          })
        }

        const data = await getProducts(params)
        setProducts(data)
      } catch (err: unknown) {
        setError('Error loading products')
      }
    }

    loadCollections()
    loadProducts()
  }, [path, searchTerm, selectedCategory])

  if (error) {
    return (
      <div className="container mx-auto min-h-screen p-8 mt-16">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <main className="container mx-auto min-h-screen pt-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <CategoriesSideBar
          name="Collections"
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />

        <section className="md:col-span-3">
          <h1>Products</h1>
          <br />
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {products.map((item, index) => (
                <Link
                  key={index}
                  to="/products/$productId"
                  params={{ productId: String(item.id) }}
                  className="hover:opacity-75"
                >
                  <Product
                    title={item.name}
                    image={item.image}
                    description={item.description}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center content-center items-center h-96">
              <span>No products found</span>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
