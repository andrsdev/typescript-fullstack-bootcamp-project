import { Link } from '@tanstack/react-router'
import { useFetchProduct } from '../../hooks/useFetchProduct'
import { Variant } from '../../interfaces/product.interface'
import { useState } from 'react'

export const ProductDetail: React.FC<{ id: number }> = ({ id }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [product, _rest] = useFetchProduct(id)

  const [variantIndex, setVariantIndex] = useState<number>(0)

  const handleVariant = (variant_: Variant) => {
    const index = product?.variants.findIndex((v) => v.id === variant_.id) || 0
    setVariantIndex(index)
  }

  if (!product || !product.variants.length) {
    return <p>Loading or no variants available...</p>
  }

  const currentVariant = product.variants[variantIndex]

  return (
    <div className="container">
      <nav>
        <div className="logo">
          <img src="/pets.png" alt="" />
          <p>PETSHOP</p>
        </div>
      </nav>
      <main className="product-detail-grid">
        <div className="product-image">
          <Link to={'/'} className="back-button">
            &#8249;
          </Link>
          <img
            src={
              'https://devchallengesyf.s3.us-east-2.amazonaws.com/products/' +
              currentVariant.image
            }
            alt={currentVariant.name}
          />
        </div>
        <div className="product-detail">
          <h1 className="product-name">{currentVariant.name}</h1>
          <p className="product-description">{currentVariant.description}</p>
          <p className="product-price">{'$ ' + currentVariant.price}</p>
          <div className="variants">
            <p className="text">Options:</p>
            {product.variants.map((variant_: Variant) => (
              <span
                key={variant_.id}
                className={
                  currentVariant.id === variant_.id
                    ? 'option opt-selected'
                    : 'option'
                }
                onClick={() => handleVariant(variant_)}
              >
                {variant_.name}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
