import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'


export const Route = createRootRoute({
    component: () => (
        <>
        <QueryClientProvider client={new QueryClient()}>
            <div className="p-2 flex gap-2">
                <Link to="/" className="[&.active]:font-bold">
                    Home
                </Link>{' '}
                <Link to="/about" className="[&.active]:font-bold">
                    About
                </Link>
            </div>
            <hr />
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
            </QueryClientProvider>
        </>
        
    ),
})