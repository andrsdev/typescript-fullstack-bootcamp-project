import { useContext } from 'react'
import { SearchContext, SearchContextType } from './../context/SearchContext'

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be use into a SearchProvider')
  }
  return context
}
