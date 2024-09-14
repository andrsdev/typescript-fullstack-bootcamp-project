import { Collection } from "../../models/Collection";
import { Genre } from "../../models/Genre";
import { Variant } from "../../models/Variant";

export interface ProductDtoResponse {
    id: number;
    name: string;
    description: string | null;
    image?: string;
    price: number;
    releaseDate?: Date | string;
    genres?: Genre[];
    developer: string;
    publisher: string;
    variants: Variant[];
    collections?: Collection[];
}