import { FC } from 'react'

interface ProductProps {
  title: string
  image?: string
  description?: string
}

const Product: FC<ProductProps> = ({ title, image, description }) => {
  return (
    <div className="bg-black text-white p-4 rounded-lg shadow-lg hover:cursor-pointer">
      {image && (
        <img src={image} alt={title} className="w-full h-auto rounded-md" />
      )}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm font-normal">{description}</p>
      </div>
    </div>
  )
}

export default Product
