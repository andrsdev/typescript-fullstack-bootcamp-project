export const getProducts = async (
  collection: number,
  sort: string,
  name: string,
) => {
  name = name.toLocaleLowerCase().trim()

  const queryParams =
    collection === -1
      ? `?sort=${sort}`
      : `/collection/${collection}?sort=${sort}`

  const filter = name.length > 0 ? `${queryParams}&name=${name}` : queryParams
  const url = `http://localhost:5001/api/product${filter}`
  const resp = await fetch(url)
  const { products = [] } = await resp.json()

  return products
}
