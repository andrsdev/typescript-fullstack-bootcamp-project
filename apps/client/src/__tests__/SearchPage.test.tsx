import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchPage from '../components/SearchPage';
import { fetchProducts, fetchCollections } from '../api';

// Mock the API calls
jest.mock('../api', () => ({
  fetchProducts: jest.fn(),
  fetchCollections: jest.fn(),
}));

// Mock data
const mockCollections = [
  { id: 1, name: 'Collection 1' },
  { id: 2, name: 'Collection 2' },
];

const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for product 1',
    image: 'image-url-1',
    variants: [{ id: 1, name: 'Variant 1', price: 1000 }],
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for product 2',
    image: 'image-url-2',
    variants: [{ id: 2, name: 'Variant 2', price: 2000 }],
  },
];

describe('SearchPage Component', () => {
  beforeEach(() => {
    (fetchCollections as jest.Mock).mockResolvedValue({ data: mockCollections });
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('renders the search input, collections dropdown, and sort dropdown', async () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();
      expect(screen.getByText(/all collections/i)).toBeInTheDocument();
      expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    });
  });

  it('fetches and displays collections', async () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    await waitFor(() => {
      expect(fetchCollections).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Collection 1')).toBeInTheDocument();
      expect(screen.getByText('Collection 2')).toBeInTheDocument();
    });
  });

  it('fetches and displays products', async () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    await waitFor(() => {
      expect(fetchProducts).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      expect(screen.getByText('Lower Price: $10.00')).toBeInTheDocument();
      expect(screen.getByText('Lower Price: $20.00')).toBeInTheDocument();
    });
  });

  it('updates products based on search input', async () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'Product' } });

    await waitFor(() => {
      expect(fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ search: 'Product' }));
    });
  });

  it('updates products based on collection selection', async () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const collectionSelect = screen.getByText(/all collections/i);
    fireEvent.change(collectionSelect, { target: { value: '1' } });

    await waitFor(() => {
      expect(fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ collection: '1' }));
    });
  });

  it('updates products based on sort selection', async () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    const sortSelect = screen.getByText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'price_asc' } });

    await waitFor(() => {
      expect(fetchProducts).toHaveBeenCalledWith(expect.objectContaining({ sort: 'price_asc' }));
    });
  });

  it('displays an error message when fetching products fails', async () => {
    (fetchProducts as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch products'));

    render(
      <Router>
        <SearchPage />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load products/i)).toBeInTheDocument();
    });
  });

  it('displays "View Details" link for each product', async () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );

    await waitFor(() => {
      const detailsLinks = screen.getAllByText('View Details');
      expect(detailsLinks).toHaveLength(2);
      expect(detailsLinks[0]).toHaveAttribute('href', '/product/1');
      expect(detailsLinks[1]).toHaveAttribute('href', '/product/2');
    });
  });
});