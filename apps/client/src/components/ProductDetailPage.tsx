import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';

interface Variant {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  variants: Variant[];
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id!)
      .then((response) => {
        setProduct(response.data);
        if (response.data.variants && response.data.variants.length > 0) {
          setSelectedVariant(response.data.variants[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <h2 className="text-xl font-semibold mb-2">Variants</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {product.variants && product.variants.length > 0 ? (
              product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedVariant?.id === variant.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {variant.name}
                </button>
              ))
            ) : (
              <p>No variants available</p>
            )}
          </div>
          {selectedVariant && (
            <div>
              <p className="text-xl font-bold mb-2">
                Price: ${(selectedVariant.price / 100).toFixed(2)}
              </p>
              <p className="mb-2">Stock: {selectedVariant.stock}</p>
              <button
                className={`px-6 py-2 rounded-lg ${
                  selectedVariant.stock > 0
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={selectedVariant.stock === 0}
              >
                {selectedVariant.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;