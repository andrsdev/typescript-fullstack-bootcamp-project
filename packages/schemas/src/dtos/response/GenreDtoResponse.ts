import { Product } from "../../models/Product";

export interface GenreDtoResponse {
    id: number;
    name: string;
    products?: Product[];
}