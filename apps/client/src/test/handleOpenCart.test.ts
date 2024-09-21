describe('handleOpenCart', () => {
  test('Should handle open cart', () => {
    const setCartOpen = jest.fn()
    const handleOpenCart = () => setCartOpen(true)
    handleOpenCart()
    expect(setCartOpen).toHaveBeenCalledWith(true)
  })
})
