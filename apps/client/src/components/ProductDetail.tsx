import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, Product } from "../services/api";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          // Usa getProductById desde el archivo de servicios API
          const data = await getProductById(Number(id));
          setProduct(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
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

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Variants</h3>
        <ul className="list-disc list-inside pl-4 mb-8">
          {product.variants.map(variant => (
            <li key={variant.id} className="text-lg text-gray-600">{variant.name}</li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Collections</h3>
        <ul className="list-disc list-inside pl-4 mb-8">
          {product.collections.map(collection => (
            <li key={collection.id} className="text-lg text-gray-600">{collection.name}</li>
          ))}
        </ul>

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
