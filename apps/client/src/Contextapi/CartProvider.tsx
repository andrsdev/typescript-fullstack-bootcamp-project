import React, { createContext, useContext, useReducer } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<
  | {
      state: CartState
      dispatch: React.Dispatch<CartAction>
    }
  | undefined
>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id,
      )
      let updatedItems = [...state.items]

      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += action.item.quantity
      } else {
        updatedItems.push(action.item)
      }

      return {
        ...state,
        items: updatedItems,
        total: state.total + action.item.price * action.item.quantity,
      }

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter((item) => item.id !== action.id)
      const removedItem = state.items.find((item) => item.id === action.id)

      return {
        ...state,
        items: filteredItems,
        total:
          state.total -
          (removedItem?.price ?? 0) * (removedItem?.quantity ?? 0),
      }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
      }

    default:
      throw new Error('Unhandled action type')
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
