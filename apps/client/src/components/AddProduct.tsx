// src/components/AddProduct.tsx
import { useState } from "react";
import { createProduct } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = {
      name,
      description,
      price,
      variants: [],
      collections: [], // Inicia vacío o agrega lógicas de variantes
    };

    await createProduct(productData)
      .then(createdProduct => console.log('Product created:', createdProduct))
      .catch(error => console.error('Error creating product:', error));

    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-colors"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
