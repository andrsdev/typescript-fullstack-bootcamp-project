import { Product } from '@repo/shared'
import { Link } from '@tanstack/react-router'
import { priceFormatter } from '../../utils'
interface ProductCardProps {
  product: Product
}

export const ProductCard = (props: ProductCardProps) => {
  const { product } = props
  return (
    <Link to={`/products/${product.id}`}>
      <div className="p-2">
        <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover object-center rounded-lg"
          />
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-indigo-600">
                {product.name}
              </p>
              <button className="bg-indigo-600 text-white text-sm font-bold py-1 px-4 rounded-full hover:bg-indigo-500 transition-colors duration-300">
                {priceFormatter(product.price)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
