// Define el tipo Product para usar en la aplicación
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    variants: Variant[];
    collections: Collection[];
  }
  
  export interface Variant {
    id: number;
    name: string;
    productId: number;
  }
  
  export interface Collection {
    id: number;
    name: string;
  }
  
  // Define la URL base de la API
  const baseURL = 'http://localhost:5001/app/products';
  
  

  // Obtener todos los productos
  export const getProducts = async (): Promise<Product[]> => {
    try {
      const response = await fetch(baseURL);
  
      if (!response.ok) {
        throw new Error(`Error fetching products: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data || !data.result) {
        throw new Error('Invalid data structure from API');
      }
  
      return data.result; // Suponiendo que `result` contiene los productos
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error; // Re-lanzar el error para manejarlo en otros componentes si es necesario
    }
  };
  
  // Getting Product by ID
  export const getProductById = async (id: number): Promise<Product> => {
    try {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error data:', errorData);
        throw new Error(`Network response was not ok: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched data:', data);

      // Verificar que `result` esté presente y tenga la estructura correcta
      const product = data.result;
      if (!product || typeof product.id !== 'number' || typeof product.name !== 'string' || typeof product.price !== 'number') {
        throw new Error('Invalid data structure from API');
      }

      return product as Product;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        throw new Error(`Failed to fetch product: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Failed to fetch product due to an unexpected error');
      }
    }
  };

  // Crear un nuevo producto
  export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Response error data:', errorData);
        throw new Error(`Network response was not ok: ${errorData.message || response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data || !data.id || !data.name || typeof data.price !== 'number') {
        throw new Error('Invalid data structure from API');
      }
  
      return data as Product;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        throw new Error(`Failed to create product: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
        throw new Error('Failed to create product due to an unexpected error');
      }
    }
  };

export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const response = await fetch(`http://localhost:5001/app/products?search=${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result as Product[];
  } catch (error) {
    console.error('Error searching for products:', error);
    throw error;
  }
};
