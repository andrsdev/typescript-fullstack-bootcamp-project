import { useState } from 'react'
import { ProductCard } from '../../components/ProductCard'
import { useFetchCollections } from '../../hooks/useFetchCollections'
import { Collection } from '../../interfaces/collection.interface'
import { useFetchProducts } from '../../hooks/useFetchProductsByCollection'
import { Product } from '../../interfaces/product.interface'
import { Search } from '../../components/Search'

export const StoreLayout = () => {
  const { collection } = useFetchCollections()

  const [searchText, setSearchText] = useState<string>('')
  const [selected, setSelected] = useState(-1)
  const [sort, setSort] = useState('desc')

  const { products, isLoadingProducts } = useFetchProducts(
    selected,
    sort,
    searchText,
  )

  const handleCollectionSelected = (collectionId: number) => {
    setSelected(collectionId)
  }

  const handleSortOption = () => {
    const newSort = sort === 'desc' ? 'asc' : 'desc'
    setSort(newSort)
  }

  const handleSearch = (text: string) => {
    setSearchText(text)
  }

  return (
    <div className="container">
      <nav>
        <div className="logo">
          <img src="./public/pets.png" alt="" />
          <p>PETSHOP</p>
        </div>
        <div className="search-container">
          <Search onSearch={handleSearch} />
        </div>
      </nav>
      <section className="sort-section">
        <div className="collections">
          <p
            className={
              selected === -1
                ? 'collection-option collection-selected'
                : 'collection-option'
            }
            onClick={() => handleCollectionSelected(-1)}
          >
            All
          </p>
          {collection.map((collection: Collection) => (
            <p
              className={
                selected === collection.id
                  ? 'collection-option collection-selected'
                  : 'collection-option'
              }
              key={collection.id}
              onClick={() => handleCollectionSelected(collection.id)}
            >
              {collection.name}
            </p>
          ))}
        </div>
        <button
          className={
            sort === 'desc' ? 'sort-btn sort-htl' : 'sort-btn sort-lth'
          }
          onClick={() => handleSortOption()}
        >
          Sort by price
        </button>
      </section>
      <main>
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map((product: Product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          !isLoadingProducts && (
            <div className="no-result-message">
              <img src="/no-result.svg" />
              <p className="message-title">No Result Found</p>
              <p className="message-description">
                We can't find any item matching your search
              </p>
            </div>
          )
        )}
      </main>
    </div>
  )
}
