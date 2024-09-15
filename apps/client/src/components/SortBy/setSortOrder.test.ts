describe('setSortOrder', () => {
  test('Should set sort order', () => {
    const setSortOrder = jest.fn()
    const handleSortOrder = (value: string) => setSortOrder(value)
    handleSortOrder('low-to-high')
    expect(setSortOrder).toHaveBeenCalledWith('low-to-high')
  })
})
