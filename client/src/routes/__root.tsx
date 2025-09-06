import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRoute({ component: RootLayout })

const queryClient = new QueryClient()

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
