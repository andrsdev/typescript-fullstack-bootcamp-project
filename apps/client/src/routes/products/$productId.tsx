import { createRoute } from '@tanstack/react-router'
import Variant from '../../components/variant/Variant'
import { Route as rootRoute } from '../__root'

export const Route = createRoute({
  component: Variant,
  path: '/products/$productId',
  getParentRoute: () => rootRoute,
})
