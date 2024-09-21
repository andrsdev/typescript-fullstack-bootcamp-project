import { act, renderHook } from '@testing-library/react'
import { useForm } from './useForm'

describe('useForm tests', () => {
  const initialForm = {
    searchText: 'collar',
  }

  test('Should return default values...', () => {
    const { result } = renderHook(() => useForm(initialForm))

    expect(result.current).toEqual({
      searchText: initialForm.searchText,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    })
  })

  test('Should reset the form', () => {
    const newValue = 'Dummyname'
    const { result } = renderHook(() => useForm(initialForm))
    const { onInputChange, onResetForm } = result.current

    act(() => {
      onInputChange({
        target: { name: 'name', value: newValue },
      } as React.ChangeEvent<HTMLInputElement>)
      onResetForm()
    })

    expect(result.current.searchText).toBe(initialForm.searchText)
    expect(result.current.formState.searchText).toBe(initialForm.searchText)
  })

  test('Should change form searching text', () => {
    const newValue = 'toy'
    const { result } = renderHook(() => useForm(initialForm))
    const { onInputChange } = result.current

    act(() => {
      onInputChange({
        target: { name: 'searchText', value: newValue },
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.searchText).toBe(newValue)
    expect(result.current.formState.searchText).toBe(newValue)
  })
})
