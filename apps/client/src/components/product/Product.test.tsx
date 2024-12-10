import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Product from './Product'

describe('Product Component', () => {
  it('renders the product with title, image, and description', () => {
    render(
      <Product
        title="Sample Product"
        image="https://via.placeholder.com/150"
        description="This is a sample product."
      />,
    )

    const title = screen.getByRole('heading', { name: /sample product/i })
    const description = screen.getByText(/this is a sample product/i)
    const image = screen.getByAltText(/sample product/i)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150')
  })

  it('renders without an image', () => {
    render(
      <Product
        title="Product Without Image"
        description="No image provided for this product."
      />,
    )

    const title = screen.getByText(/product without image/i)
    const description = screen.getByText(/no image provided for this product/i)
    const image = screen.queryByAltText(/product without image/i)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(image).toBeNull()
  })

  it('renders without a description', () => {
    render(
      <Product
        title="Product Without Description"
        image="https://via.placeholder.com/150"
      />,
    )

    const title = screen.getByText(/product without description/i)
    const image = screen.getByAltText(/product without description/i)
    const description = screen.queryByText(/no description provided/i)

    expect(title).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150')
    expect(description).toBeNull()
  })
})
