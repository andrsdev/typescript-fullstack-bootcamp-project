import { createFileRoute } from '@tanstack/react-router'
import { Input } from '../components/Input'
import { ProductList } from '../components/ProductList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Sidebar } from '../components/Sidebar'



const queryClient = new QueryClient()

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className='flex justify-center mb-4'>
            <Input className='w-full max-w-lg p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Search...' />
          </div>
          <ProductList />
        </main>
      </div>
    </QueryClientProvider>
  )
}