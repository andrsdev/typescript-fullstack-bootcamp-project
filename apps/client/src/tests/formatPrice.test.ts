import { formatPrice } from "./formatPrice";

describe('formatPrice', () => {
    it('should format the price correctly', () => {
        const result = formatPrice(1000);
        expect(result).toEqual("$10.00");
    });

    it('should format negative values', ()=>{
        const result = formatPrice(-1000);
        expect(result).toEqual("-$10.00");
    })
});