import { formatDate } from "./formatDate";


describe('format string \'dd-MM-yyy\' date to Date()', () => {
    it('should return a date in format dd-MM-yyyy', () => {
        const date = new Date(2024, 8, 17); //month 8 is september, months start from 0
        expect(formatDate(date)).toBe('17-09-2024');
    })
})