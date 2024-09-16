import { BaseResponseGeneric, ProductDtoResponse } from '@repo/schemas';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '../../components/Button';
import { useState } from 'react';
import { RadioGroup } from '../../components/RadioGroup';
import { RadioGroupItem } from '../../components/RadioGroupItem';


export const Route = createFileRoute('/product/$id')({
    component: ProductPage
})

function ProductPage() {
    const { id } = Route.useParams();
    const [color, setColor] = useState('black');
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

    const { data, isLoading, error } = useQuery<BaseResponseGeneric<ProductDtoResponse>>({
        queryKey: ['products', id],
        queryFn: () => fetch(`http://localhost:5001/api/products/${id}`)
            .then((result) => result.json())
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading product</div>;
    }
    const product = data?.data;
    return (
        <div className="bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {/* Product image */}
                        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={product?.image || '/placeholder.svg?height=400&width=400'}
                                alt={`${product?.name}`}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product?.name || 'Product Name'}</h1>
                            <div className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                ${product?.price.toFixed(2) || '0.00'} USD
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold mb-2">Editions</h2>
                            <RadioGroup value={color} onValueChange={setColor}>
                                <div className="flex space-x-2">
                                    <div className="flex items-center space-x-2">
                                        {product?.variants.map((variant) => (
                                            <div key={variant.id} className="flex items-center space-x-2">
                                                <RadioGroupItem
                                                    value={variant.name}
                                                    id={variant.id.toString()}
                                                    checked={selectedVariant === variant.name}
                                                    onChange={() => setSelectedVariant(variant.name)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <p className="text-gray-600">
                            {product?.description || 'Product description goes here.'}
                        </p>

                        <Button className="w-full">
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

}