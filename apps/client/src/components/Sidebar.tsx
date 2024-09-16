import { BaseResponseGeneric, CollectionDtoResponse, GenreDtoResponse } from "@repo/schemas"
import { useQuery } from "@tanstack/react-query"


export function Sidebar() {

    const collectionData = useQuery<BaseResponseGeneric<CollectionDtoResponse[]>>({
        queryKey: ['collections'],
        queryFn: () => fetch('http://localhost:5001/api/collections')
            .then((result) => result.json())
    })

    const genreData = useQuery<BaseResponseGeneric<GenreDtoResponse[]>>({
        queryKey: ['genres'],
        queryFn: () => fetch('http://localhost:5001/api/genres')
            .then((result) => result.json())
    })

    return (
        <aside className="w-64 p-8 bg-gray-100">
            <h2 className="text-lg font-semibold mb-4">Collections</h2>
            <ul className="space-y-3">
                {collectionData?.data?.data?.map((collection) => (
                    <li className="p-1 rounded hover:bg-blue-100" key={collection.id}>{collection.name}</li>
                ))}
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-4">Genres</h2>
            <ul className="space-y-2">
                {genreData?.data?.data?.map((genre) => (
                    <li className="p-1 rounded hover:bg-blue-100 " key={genre.id}>{genre.name}</li>
                ))}
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-4">Sort</h2>
            <ul className="space-y-2">
                <li>Price: Low to high</li>
                <li>Price: High to low</li>
            </ul>
        </aside>
    )
}