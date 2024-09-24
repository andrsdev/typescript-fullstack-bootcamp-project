import { ProductCardProps } from '../interfaces/product.interface'
import { Link } from '@tanstack/react-router'

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
}) => {
  return (
    <Link to={`/product/${id}`} key={id} className="product-card-link">
      <div className="product-card">
        <div className="card-image-container">
          <img
            src={
              'https://devchallengesyf.s3.us-east-2.amazonaws.com/products/' +
              image
            }
            alt={name}
          />
          <p className="hide">View Product</p>
        </div>
        <p className="card-title">{name}</p>
        <span className="price-badge">{'$' + price}</span>
      </div>
    </Link>
  )
}
