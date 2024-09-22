import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Adjust the URL to match your backend
});

export const fetchProducts = async (params: { search?: string; collection?: string; sort?: string }) => {
    const response = await api.get('/products', { params });
    return response.data;
  };

export const fetchProductById = (id: string) => api.get(`/products/${id}`);

export const fetchCollections = () => api.get('/collections');