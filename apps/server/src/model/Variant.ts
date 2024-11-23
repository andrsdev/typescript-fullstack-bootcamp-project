import { OptionValueToVariant } from './OptionValueToVariant';

export type Variant = {
  id: number;
  name: string;
  sku: string;
  stock: number;
  price: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  optionValues?: OptionValueToVariant[]; // Relación con OptionValueToVariant
};

