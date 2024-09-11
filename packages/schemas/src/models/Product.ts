import { z } from 'zod';

// export const Product = z.object({
//   id: z.number(),
//   name: z.string(),
//   price: z.number(),
//   description: z.string().nullable(),
//   image: z.string().nullable(),
// });

// export type Product = z.infer<typeof Product>;

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

