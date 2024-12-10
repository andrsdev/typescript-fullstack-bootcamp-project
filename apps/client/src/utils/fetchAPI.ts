import axiosInstance from './axiosInstance'

export type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface FetchOptions<TData, TParams> {
  method: FetchMethod
  url: string
  data?: TData
  params?: TParams
}

export async function fetchAPI<TRequest, TResponse, TParams>(
  options: FetchOptions<TRequest, TParams>,
): Promise<TResponse> {
  const { method, url, data, params } = options

  const response = await axiosInstance.request<TResponse>({
    method,
    url,
    data,
    params,
  })

  return response.data
}
