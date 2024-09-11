import { Product } from "../../models/Product";

export interface CollectionDtoResponse {
    id: number;
    name: string;
    description?: string | null;
    manufacturer?: string;
    products?: Product[];
}