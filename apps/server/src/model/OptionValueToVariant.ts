import { Variant } from './Variant';
import { OptionValue } from './OptionValue';

export type OptionValueToVariant = {
  variantId: number;
  optionValueId: number;
  variant?: Variant; // Relación con Variant
  optionValue?: OptionValue; // Relación con OptionValue
};
