import { Variant } from './Variant'; // Modelo de Variant
import { Option } from './Option'; // Modelo de Option
import { ProductsOnCollections } from './ProductsOnCollections'; // Modelo de la relación intermedia

export type Product = {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  variants?: Variant[]; // Relación con Variant
  options?: Option[]; // Relación con Option
  collections?: ProductsOnCollections[]; // Relación con colecciones a través de la tabla intermedia
};

