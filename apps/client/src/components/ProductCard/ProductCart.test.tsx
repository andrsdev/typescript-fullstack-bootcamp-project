import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from './ProductCard'

jest.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}))

test('loads and displays product details in a card', async () => {
  render(
    <ProductCard
      product={{
        name: 'Product Name',
        price: 1200,
        description: 'Product description',
        image: 'https://via.placeholder.com/150',
        id: 1,
      }}
    />,
  )

  const title = await screen.findByText('Product Name')

  expect(title).toBeTruthy()
})
