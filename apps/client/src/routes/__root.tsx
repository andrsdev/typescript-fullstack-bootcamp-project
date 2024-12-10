import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import NavBar from '../components/global/NavBar/NavBar'
import NotFound from '../components/global/NotFound/NotFound'
import { SearchProvider } from '../context/SearchContext'

export const Route = createRootRoute({
  component: () => (
    <SearchProvider>
      <NavBar />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </SearchProvider>
  ),
  notFoundComponent: NotFound,
})
