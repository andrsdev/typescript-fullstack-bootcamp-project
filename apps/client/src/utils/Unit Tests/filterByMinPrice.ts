export const filterByMinPrice = (products: { price: number }[], minPrice: number) => {
    return products.filter(product => product.price >= minPrice);
  };