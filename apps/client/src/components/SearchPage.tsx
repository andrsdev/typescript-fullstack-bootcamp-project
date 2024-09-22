import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCollections } from '../api';

interface Variant {
    id: number;
    name: string;
    price: number;
}
  
interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    variants: Variant[];
}
  
interface Collection {
    id: number;
    name: string;
}

const SearchPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [search, setSearch] = useState('');
    const [selectedCollection, setSelectedCollection] = useState('');
    const [sort, setSort] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        fetchCollections()
            .then((response) => setCollections(response.data))
            .catch((err) => setError('Failed to load collections'));
    }, []);
  
    useEffect(() => {
        setLoading(true);
        const params: any = {};
        if (search) params.search = search;
        if (selectedCollection) params.collection = selectedCollection;
        if (sort) params.sort = sort;  // Sorting parameter is being passed
      
        fetchProducts(params)
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError('Failed to load products: ' + (err.response?.data?.details || err.message || 'Unknown error'));
                setLoading(false);
            });
    }, [search, selectedCollection, sort]);  // Dependency includes sort

    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products"
                    className="border p-2 w-full md:w-1/3 rounded-md"
                />
                <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-auto"
                >
                    <option value="">All Collections</option>
                    {collections.map((collection) => (
                        <option key={collection.id} value={collection.id.toString()}>
                            {collection.name}
                        </option>
                    ))}
                </select>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-auto"
                >
                    <option value="">Sort by</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center mt-10">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product) => {
                        // Calculate the lowest price from the variants
                        const lowestPrice = Math.min(...product.variants.map(variant => variant.price));

                        return (
                            <div key={product.id} className="border p-6 shadow-lg rounded-lg">
                                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-4">{product.description}</p>
                                {/* Display the lowest price */}
                                <p className="text-lg font-bold mb-4">Price: ${(lowestPrice / 100).toFixed(2)}</p>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <Link
                                    to={`/product/${product.id}`}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    View Details
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
