import { ProductVariants } from '@repo/shared'

type VariantSelectorProps = {
  label: string
  variants: ProductVariants[]
  selectedValue: string | number
  variantKey: 'color' | 'size' | 'stock'
  handleSelect: (
    key: 'color' | 'size' | 'stock',
    value: string | number,
  ) => void
}

export const VariantSelector = (props: VariantSelectorProps) => {
  const { handleSelect, label, selectedValue, variants, variantKey } = props
  return (
    <div className="mt-4">
      <p>{label}</p>
      <div className="flex space-x-2 mt-2">
        {variants.map((variant, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg border-2 ${
              selectedValue === variant[variantKey]
                ? 'border-indigo-600'
                : 'border-gray-300'
            }`}
            onClick={() => handleSelect(variantKey, variant[variantKey])}
          >
            {variant[variantKey]}
          </button>
        ))}
      </div>
    </div>
  )
}
