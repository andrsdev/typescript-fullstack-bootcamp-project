import { Product } from "./Product";

export type Collection = {
    id: number;
    name: string;
    description?: string | null;
    manufacturer?: string;
    products?: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}