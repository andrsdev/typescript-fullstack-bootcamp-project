import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from './ProductCard'
import { useNavigate } from "@tanstack/react-router";

jest.mock('@tanstack/react-router', () => ({
  useNavigate: jest.fn(() => Promise.resolve()), // Mock de navigate
}),
);

describe('ProductCard', () => {
  test('loads and displays the name/title', async () => {
    // ARRANGE
    render(<ProductCard product={{
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
      image: 'https://via.placeholder.com/150',
      developer: 'Developer 1',
      publisher: 'Publisher 1',
      variants: [{
        id: 1,
        name: 'Variant 1',
        price: 100,
        productId: 1,
        stock: 10,
      }],
    }} />)


    // ACT
    const title = await screen.findByText('Product 1');
    const description = await screen.findByText('Description 1');
    const price = await screen.findByText('$100.00');

    // ASSERT
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(price).toBeTruthy();
  })

  test('renders View more button with onClick event', async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    // ARRANGE
    render(<ProductCard product={{
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
      image: 'https://via.placeholder.com/150',
      developer: 'Developer 1',
      publisher: 'Publisher 1',
      variants: [{
        id: 1,
        name: 'Variant 1',
        price: 100,
        productId: 1,
        stock: 10,
      }],
    }} />)

    // ACT
    const viewMoreButton = screen.getByText('View more');
    fireEvent.click(viewMoreButton);
    // screen.debug();
    // ASSERT
    expect(viewMoreButton).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith({ to: '/product/1' });
  })

})