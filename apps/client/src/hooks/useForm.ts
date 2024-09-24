import React, { useState } from 'react'

export const useForm = (initialForm = { searchText: '' }) => {
  const [formState, setFormState] = useState(initialForm)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  }
}
