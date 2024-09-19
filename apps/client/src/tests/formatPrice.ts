export function formatPrice(value: number){
    const formatter = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return formatter.format(value/100);
}