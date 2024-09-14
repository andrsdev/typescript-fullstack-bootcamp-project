import { useEffect, useState } from 'react'
import { getCollections } from '../helpers/getCollections'

export const useFetchCollections = () => {
  const [collection, setCollectionName] = useState([])
  /*   const [isLoading, setIsLoading] = useState(true) */

  const getCollectionNames = async () => {
    const collectionName = await getCollections()
    setCollectionName(collectionName)
    /* setIsLoading(false) */
  }

  useEffect(() => {
    getCollectionNames()
  }, [])

  return {
    collection,
    /* isLoading, */
  }
}
