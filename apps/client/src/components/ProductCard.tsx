import { ProductCardProps } from '../interfaces/product.interface'
import { useNavigate } from '@tanstack/react-router'

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
}) => {
  const navigate = useNavigate()

  const handleProducSelection = () => {
    navigate({ to: `/product/${id}` })
  }

  return (
    <div className="product-card" onClick={handleProducSelection}>
      <div className="card-image-container">
        <img
          src={
            'https://devchallengesyf.s3.us-east-2.amazonaws.com/products/' +
            image
          }
          alt=""
        />
        <p className="hide">View Product</p>
      </div>
      <p className="card-title">{name}</p>
      <span className="price-badge">{'$' + price}</span>
    </div>
  )
}
