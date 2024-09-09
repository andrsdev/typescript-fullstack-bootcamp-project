import { sortProduct } from '@repo/shared'

interface SortByProps {
  sortOrder: string
  setSortOrder: (value: string) => void
}

const productSortby: sortProduct = {
  PRICE_LOW_TO_HIGH: 'low-to-high',
  PRICE_HIGH_TO_LOW: 'high-to-low',
}
export const SortyBy = (props: SortByProps) => {
  const { sortOrder, setSortOrder } = props
  return (
    <div>
      <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
        Sort by Price:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
      >
        <option value="none">None</option>
        <option value={productSortby.PRICE_LOW_TO_HIGH}>Low to High</option>
        <option value={productSortby.PRICE_HIGH_TO_LOW}>High to Low</option>
      </select>
    </div>
  )
}
