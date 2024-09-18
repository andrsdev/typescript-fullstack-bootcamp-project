describe('handleCloseCart', () => {
  test('Should handle close cart', () => {
    const setCartClose = jest.fn()
    const handleOpenCart = () => setCartClose(false)
    handleOpenCart()
    expect(setCartClose).toHaveBeenCalledWith(false)
  })
})
