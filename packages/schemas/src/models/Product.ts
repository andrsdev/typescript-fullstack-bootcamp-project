export type Product = {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  releaseDate: Date
  developer?: string;
  publisher?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

