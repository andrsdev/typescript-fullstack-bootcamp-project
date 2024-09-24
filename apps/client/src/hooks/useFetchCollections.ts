import { useEffect, useState } from 'react'
import { getCollections } from '../helpers/getCollections'

export const useFetchCollections = () => {
  const [collection, setCollectionName] = useState([])

  const getCollectionNames = async () => {
    const collectionName = await getCollections()
    setCollectionName(collectionName)
  }

  useEffect(() => {
    getCollectionNames()
  }, [])

  return {
    collection,
  }
}
