import React, { useRef } from 'react'
import { useForm } from '../hooks/useForm'

interface SearchProps {
  onSearch: (searchText: string) => void
}

export const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { formState, onInputChange } = useForm({
    searchText: '',
  })

  const formRef = useRef<HTMLFormElement>(null)

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(formState.searchText)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onInputChange(event)

    if (value === '' && formRef.current) {
      event.preventDefault()
      onSearch('')
    }
  }

  return (
    <form ref={formRef} onSubmit={onSearchSubmit}>
      <input
        type="search"
        placeholder="Search..."
        name="searchText"
        autoComplete="off"
        value={formState.searchText}
        onInput={handleInputChange}
      />
    </form>
  )
}
