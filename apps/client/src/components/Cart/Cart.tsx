import { useCart } from '../../Contextapi/CartProvider'

export const Cart = () => {
  const { state, dispatch } = useCart()

  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id })
  }

  return (
    <div className="cart bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
      <ul className="divide-y divide-gray-200 mb-4">
        {state.items.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2">
            <div>
              <p className="text-gray-800 font-semibold">{item.name}</p>
              <p className="text-gray-600">
                ${item.price} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="text-xl font-semibold text-gray-800 mb-4">
        Total: ${state.total}
      </p>
      <button
        onClick={() => dispatch({ type: 'CLEAR_CART' })}
        className="bg-red-500 text-white w-full py-2 rounded font-semibold hover:bg-red-600 transition-colors"
      >
        Clear Cart
      </button>
    </div>
  )
}
