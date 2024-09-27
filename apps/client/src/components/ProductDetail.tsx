
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, Product } from "../services/api";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null); // Estado para la variante seleccionada
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null); // Estado para la colección seleccionada

  // In ProductDetail component
  useEffect(() => {
    console.log('Fetching product');
    const fetchProduct = async () => {
      console.log('Fetch initiated');
      if (id) {
        try {
          const data = await getProductById(Number(id));
          console.log('Product fetched:', data);
          setProduct(data);
        } catch (err) {
          console.error('Error fetching product:', err);
          setError('An error occurred');
        }
      }
    };
    fetchProduct();
  }, [id]);


  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (!product) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">{product.name}</h1>
        <p className="text-lg text-gray-700 mb-6">{product.description}</p>
        <p className="text-xl font-semibold text-gray-900 mb-8">Price: ${product.price.toFixed(2)}</p>

        {/* ComboBox para seleccionar variantes */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Variants</h3>
        <label htmlFor="variant-select">Select a variant:</label>

        <select
          id="variant-select"
          role="combobox"
          aria-label="Variants"
          value={selectedVariant || ''}
          onChange={(e) => setSelectedVariant(Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md mb-8"
        >
          {product.variants.map(variant => (
            <option key={variant.id} value={variant.id}>
              {variant.name}
            </option>
          ))}
        </select>


        {/* ComboBox para seleccionar colecciones */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Collections</h3>
        <label htmlFor="collection-select">Select a collection:</label>
        <select
          id="collection-select"
          value={selectedCollection || ''}
          onChange={(e) => setSelectedCollection(Number(e.target.value))}
          className="block w-full p-2 border border-gray-300 rounded-md mb-8"
        >
          {product.collections.map(collection => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => console.log('Add to cart logic here')}
          className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold py-3 rounded-lg shadow-md hover:from-teal-600 hover:to-teal-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
