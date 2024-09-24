import { renderHook, waitFor } from '@testing-library/react'
import { useFetchCollections } from './useFetchCollections'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  }),
) as jest.Mock

describe('useFetchCollection test', () => {
  test('Should return initial state', async () => {
    const { result } = renderHook(() => useFetchCollections())

    await waitFor(() => {
      expect(result.current.collection.length).toBe(0)
    })
  })
})
