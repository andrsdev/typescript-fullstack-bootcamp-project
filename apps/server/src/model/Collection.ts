import { ProductsOnCollections } from './ProductsOnCollections';

export type Collection = {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  products?: ProductsOnCollections[]; // Relación con ProductsOnCollections
};
