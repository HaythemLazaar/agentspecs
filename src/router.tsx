import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { NotFound } from './components/not-found'
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })

  return router
}
