import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-4 flex gap-4 ml-20 items-center">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-500 transition-colors duration-300 [&.active]:font-bold [&.active]:text-blue-600"
        />
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
