export const getProduct = async (id: number) => {
  const url = `http://localhost:5001/api/product/${id}`
  const resp = await fetch(url)
  const { result } = await resp.json()

  return result
}
