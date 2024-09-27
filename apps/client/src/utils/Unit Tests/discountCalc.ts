export const discountCalc = (originalPrice: number, salePrice: number): number => {
    if (originalPrice <= 0) throw new Error('Invalid original price');
    return ((originalPrice - salePrice) / originalPrice) * 100;
  };