import { OptionValue } from './OptionValue';

export type Option = {
  id: number;
  name: string;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
  values?: OptionValue[]; // Relación con OptionValue
};

