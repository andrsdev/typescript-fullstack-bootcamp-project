import { createFileRoute } from '@tanstack/react-router'
import { StoreLayout } from '../store/Pages/StoreLayout'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return <StoreLayout />
}
