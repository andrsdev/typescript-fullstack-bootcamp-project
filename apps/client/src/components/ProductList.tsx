// src/components/ProductList.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, Product } from "../services/api";
import '../styles/ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Our Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <li 
            key={product.id} 
            className="bg-gradient-to-r from-indigo-100 to-indigo-200 shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <Link to={`/product/${product.id}`} className="block">
              <h2 className="text-xl font-semibold text-indigo-800 truncate">
                {product.name}
              </h2>
              <p className="text-md text-indigo-600 mt-3 line-clamp-3">${product.price.toFixed(2)}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link 
          to="/add-product" 
          className="text-white bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 font-medium rounded-lg px-5 py-2 transition-colors shadow-lg"
        >
          Add New Product
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
