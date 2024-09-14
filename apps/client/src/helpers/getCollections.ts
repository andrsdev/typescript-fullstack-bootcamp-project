export const getCollections = async () => {
  const url = `http://localhost:5001/api/collection`
  const resp = await fetch(url)
  const { collections = [] } = await resp.json()

  return collections
}
