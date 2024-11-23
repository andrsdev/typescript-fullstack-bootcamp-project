import { Option } from "./Option";
import { OptionValueToVariant } from "./OptionValueToVariant";

export type OptionValue = {
  id: number;
  value: string; // e.g., "Red", "Large"
  optionId: number;
  option?: Option; // Relación con Option
  optionValueToVariant?: OptionValueToVariant[]; // Relación con OptionValueToVariant
};
