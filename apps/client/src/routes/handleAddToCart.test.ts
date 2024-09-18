test('dispatch ADD_ITEM action', () => {
  const mockDispatch = jest.fn()
  const data = {
    result: [
      {
        id: 1,
        name: 'Test Product',
        price: 100,
      },
    ],
  }
  const handleAddToCart = () => {
    mockDispatch({
      type: 'ADD_ITEM',
      item: {
        id: data?.result[0].id ?? 0,
        name: data?.result[0].name ?? '',
        price: data?.result[0].price ?? 0,
        quantity: 1,
      },
    })
  }
  handleAddToCart()
  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'ADD_ITEM',
    item: {
      id: 1,
      name: 'Test Product',
      price: 100,
      quantity: 1,
    },
  })
})
