export type Variant = {
    id: number;
    productId: number | null;
    name: string;
    image?: string | null;
    price: number;
    stock: number;
    createdAt?: Date;
    updatedAt?: Date;
}