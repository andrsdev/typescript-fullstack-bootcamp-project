import { createContext, ReactNode, FC, useState } from 'react'

export interface SearchContextType {
  path: string
  searchTerm: string
  setSearch: (path: string, searchTerm: string) => void
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
)

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  const setSearch = (newPath: string, newSearchTerm: string) => {
    setPath(newPath)
    setSearchTerm(newSearchTerm)
  }

  return (
    <SearchContext.Provider value={{ path, searchTerm, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}
