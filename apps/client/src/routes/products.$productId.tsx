import { createFileRoute, Link } from '@tanstack/react-router'
import { useDetails } from '../hooks'
import { useState } from 'react'
import { useCart } from '../Contextapi/CartProvider'
import { Modal } from '../components/Modal'
import { Cart, VariantSelector } from '../components'
import { priceFormatter } from '../utils'

const ProductDetails = () => {
  const { productId } = Route.useParams()
  const { data } = useDetails(Number(productId))
  const [isCartOpen, setCartOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<number>(0)
  const [selectedStock, setSelectedStock] = useState<number>(0)

  const handleSelect = (type: string, value: number | string) => {
    if (type === 'color') setSelectedColor(value as string)
    if (type === 'size') setSelectedSize(value as number)
    if (type === 'stock') setSelectedStock(value as number)
  }

  const { state, dispatch } = useCart()

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      item: {
        id: data?.result[0].id ?? 0,
        name: data?.result[0].name ?? '',
        price: data?.result[0].price ?? 0,
        quantity: 1,
      },
    })
  }

  const handleOpenCart = () => setCartOpen(true)
  const handleCloseCart = () => setCartOpen(false)

  return (
    <div className="p-4">
      <Modal isOpen={isCartOpen} onClose={handleCloseCart}>
        <Cart />
      </Modal>
      <div className="p-4 flex justify-between items-center ">
        <Link to={`/`}>
          <p>Home</p>
        </Link>
        <button
          onClick={handleOpenCart}
          className="relative flex items-center px-4 py-2 rounded-full border-2 border-gray-300 bg-white text-gray-700 shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <span className="text-lg">🛍️</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {state.items.length}
          </span>
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row">
        {/* Product Image */}

        <div className="lg:w-1/2">
          <img
            src={data?.result[0].image}
            alt={data?.result[0].name}
            className="w-full h-64 object-cover object-center rounded-lg lg:h-full"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-8 mt-4 lg:mt-0">
          <h1 className="text-2xl font-bold text-gray-800">
            {data?.result[0].name}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {priceFormatter(data?.result[0].price ?? 0)}
          </p>
          <p className="text-gray-700 mt-4">{data?.result[0].description}</p>

          <hr className="my-4" />

          {/* Product Variants */}
          {data?.result[0].variants && data?.result[0].variants.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Available Variants
              </h2>

              {/* Colors */}
              <VariantSelector
                label="Colors"
                variants={data?.result[0].variants}
                selectedValue={selectedColor}
                variantKey="color"
                handleSelect={handleSelect}
              />

              {/* Sizes */}
              <VariantSelector
                label="Size"
                variants={data?.result[0].variants}
                selectedValue={selectedSize}
                variantKey="size"
                handleSelect={handleSelect}
              />

              {/* Stock */}
              <VariantSelector
                label="Stock"
                variants={data?.result[0].variants}
                selectedValue={selectedStock}
                variantKey="stock"
                handleSelect={handleSelect}
              />
              {/* Footer button */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export const Route = createFileRoute('/products/$productId')({
  component: ProductDetails,
})
