import { Product } from "./Product";

export type Genre = {
    id: number;
    name: string;
    products?: Product[];
    createdAt: Date;
    updatedAt: Date;

}