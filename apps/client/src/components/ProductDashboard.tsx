// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { getProducts, searchProducts, Product } from "../services/api";

// // Componente principal que combina búsqueda y lista de productos
// const ProductDashboard: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Cargar todos los productos al inicio
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (err) {
//         setError('Error fetching products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Manejar la búsqueda de productos
//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
  
//     try {
//       const result = await searchProducts(searchTerm);
//       console.log('Filtered Products:', result); // <-- Verifica los resultados aquí
//       setProducts(result);
//     } catch (err) {
//       setError('Error searching for products');
//     } finally {
//       setLoading(false);
//     }
//   };  

//   return (
//     <div className="container mx-auto p-6">
//       {/* Sección de búsqueda */}
//       <h1 className="text-3xl font-bold mb-4">Product Dashboard</h1>
//       <form onSubmit={handleSearch} className="mb-6">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search product by name"
//           className="w-full p-2 border border-gray-300 rounded-md"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500"
//         >
//           {loading ? 'Searching...' : 'Search'}
//         </button>
//       </form>

//       {error && <p className="text-red-500">{error}</p>}

//       {/* Sección de lista de productos */}
//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-2xl font-bold text-teal-700 mb-6">Our Products</h2>
//         {products.length > 0 ? (
//           <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map(product => (
//               <li
//                 key={product.id}
//                 className="bg-gradient-to-r from-indigo-100 to-indigo-200 shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105 hover:shadow-2xl"
//               >
//                 <Link to={`/product/${product.id}`} className="block">
//                   <h3 className="text-xl font-semibold text-indigo-800 truncate">
//                     {product.name}
//                   </h3>
//                   <p className="text-md text-indigo-600 mt-3">${product.price.toFixed(2)}</p>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No products found</p>
//         )}

//         {/* Botón para añadir nuevo producto */}
//         <div className="mt-8">
//           <Link
//             to="/add-product"
//             className="text-white bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 font-medium rounded-lg px-5 py-2 transition-colors shadow-lg"
//           >
//             Add New Product
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getProducts, searchProducts, Product } from "../services/api";

// Componente principal que combina búsqueda y lista de productos
const ProductDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Estado para el orden de los productos

  // Cargar y ordenar los productos
  const fetchProducts = async (searchTerm: string, sortOrder: 'asc' | 'desc') => {
    setLoading(true);
    try {
      const result = await searchProducts(searchTerm);
      // Ordenar los productos por precio
      const sortedProducts = result.sort((a, b) => 
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
      setProducts(sortedProducts);
    } catch (err) {
      setError('Error searching for products');
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos al inicio y aplicar ordenamiento
  useEffect(() => {
    fetchProducts(searchTerm, sortOrder);
  }, [searchTerm, sortOrder]);

  // Manejar la búsqueda de productos
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchTerm, sortOrder);
  };

  // Manejar el cambio en el combobox de ordenamiento
  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  return (
    <div className="container mx-auto p-6">
      {/* Sección de búsqueda */}
      <h1 className="text-3xl font-bold mb-4">Product Dashboard</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search product by name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Combobox para ordenar por precio */}
      <div className="mb-6">
        <label htmlFor="sort-order" className="block text-lg font-semibold mb-2">Sort by Price</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={handleSortOrderChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Sección de lista de productos */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-teal-700 mb-6">Our Products</h2>
        {products.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <li
                key={product.id}
                className="bg-gradient-to-r from-indigo-100 to-indigo-200 shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-xl font-semibold text-indigo-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-md text-indigo-600 mt-3">${product.price.toFixed(2)}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products found</p>
        )}

        {/* Botón para añadir nuevo producto */}
        <div className="mt-8">
          <Link
            to="/add-product"
            className="text-white bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 font-medium rounded-lg px-5 py-2 transition-colors shadow-lg"
          >
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
