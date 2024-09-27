import { filterByMinPrice } from './filterByMinPrice.ts';

describe('filterByMinPrice', () => {
  const products = [
    { price: 10 },
    { price: 50 },
    { price: 100 },
  ];

  it('should return products with price greater than or equal to the minimum price', () => {
    const filtered = filterByMinPrice(products, 50);
    expect(filtered.length).toBe(2);
  });

  it('should return empty array if no products meet the minimum price', () => {
    const filtered = filterByMinPrice(products, 200);
    expect(filtered.length).toBe(0);
  });
});