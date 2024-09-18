import { priceFormatter } from './priceFormater'

describe('Format price', () => {
  it('should format the price correctly', () => {
    expect(priceFormatter(100)).toBe('$100.00')
  })
})
