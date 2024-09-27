import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductDashboard from '../../components/ProductDashboard';
import * as api from '../../services/api';

// Mock de la API
jest.mock('../../services/api');

describe('ProductDashboard', () => {
  test('renders and searches products', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 }
    ];

    (api.searchProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    render(
      <Router>
        <ProductDashboard />
      </Router>
    );

    // Verifica que el título se renderiza
    expect(screen.getByText(/Product Dashboard/i)).toBeInTheDocument();

    // Simula búsqueda de productos
    fireEvent.change(screen.getByPlaceholderText(/Search product by name/i), { target: { value: 'Product' } });
    fireEvent.click(screen.getByText(/Search/i));

    // Espera a que los productos se rendericen
    expect(await screen.findByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  });
});
