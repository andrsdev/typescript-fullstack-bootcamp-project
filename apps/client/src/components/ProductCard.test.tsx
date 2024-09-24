import { render } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import { ProductCardProps } from '../interfaces/product.interface'

jest.mock('@tanstack/react-router', () => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}))

describe('Tests on <CardProduct />', () => {
  const product: ProductCardProps = {
    id: 4,
    name: 'Dog Shampoo',
    image: 'dog-shampoo.png',
    price: 9.99,
  }

  test('Should match the snapshot', () => {
    const { container } = render(<ProductCard {...product} />)

    expect(container).toMatchSnapshot()
  })
})
