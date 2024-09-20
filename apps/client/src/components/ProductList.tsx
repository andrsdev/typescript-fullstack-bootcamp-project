import { useQuery } from "@tanstack/react-query";
import { BaseResponseGeneric, ProductDtoResponse } from "@repo/schemas";
import { ProductCard } from "./ProductCard";

export function ProductList() {
    const { data } = useQuery<BaseResponseGeneric<ProductDtoResponse[]>>({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:5001/api/products')
            .then((result) => result.json())
    })

    if(data?.status ==='error'){
        return <div>An error happened</div>
    }
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data?.data?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
// <div>
//     {status === 'pending' && <p>Loading...</p>}
//     {status === 'error' && <p>Error</p>}
//     {status === 'success' && (
//         <ul>
//             {data?.data?.map((product) => (
//                 <li key={product.id}>{product.name}
//                 <img src={product.image}/></li>
//             ))}
//         </ul>
//     )}
// </div>