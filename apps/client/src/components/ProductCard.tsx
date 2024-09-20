import { ProductDtoResponse } from "@repo/schemas";
import { Button } from "./Button";
import { useNavigate } from "@tanstack/react-router";

interface ProductCardProps {
    product?: ProductDtoResponse;
}


export function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate({ to: `/product/${product?.id}` }); // Pasando el producto como estado
    };

    if (!product) {
        return <div>null</div>;
    }
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:translate-y-[-5px] flex flex-col">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-100 object-cover"
            />
            <div className="p-4 flex-grow">
                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-blue-600"> ${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            </div>
            <div className="p-4 flex justify-between">
                <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition" onClick={handleViewMore}>View more</Button>
                <Button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">Add to Cart</Button>
            </div>

        </div>)
}