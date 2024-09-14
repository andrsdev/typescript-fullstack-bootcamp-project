import { createFileRoute } from '@tanstack/react-router'
import { ProductDetail } from '../../store/Pages/ProductDetail'

export const Route = createFileRoute('/product/$productId')({
  component: ProductPage,
})

function ProductPage() {
  const { productId } = Route.useParams()
  const id = Number(productId)

  return <ProductDetail id={id} />
}
