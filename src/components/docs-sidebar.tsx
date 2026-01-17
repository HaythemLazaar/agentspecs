import { getCategories } from '@/data'
import { cn } from '@/lib/utils'
import { Link, useRouterState } from '@tanstack/react-router'

export function DocsSidebar() {
  const router = useRouterState()
  const currentPath = router.location.pathname

  const categories = getCategories()

  return (
    <aside className="sticky left-0 top-16 z-40 h-[calc(100vh-4rem)] w-50 -ml-2 py-4 sm:py-6 lg:py-8">
      <div className="flex h-full flex-col overflow-y-auto">
        <nav className="space-y-6">
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
              Getting Started
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/introduction"
                  className={cn(
                    'flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors text-foreground font-medium capitalize',
                    currentPath.startsWith('/introduction')
                      ? 'bg-muted'
                      : 'hover:bg-muted',
                  )}
                >
                  <span>Introduction</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className={cn(
                    'flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors text-foreground font-medium capitalize',
                    currentPath.startsWith('/resources')
                      ? 'bg-muted'
                      : 'hover:bg-muted',
                  )}
                >
                  <span>Resources</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/directory"
                  className={cn(
                    'flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors text-foreground font-medium capitalize',
                    currentPath.startsWith('/directory')
                      ? 'bg-muted'
                      : 'hover:bg-muted',
                  )}
                >
                  <span>Directory</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
              Categories
            </h3>
            <ul className="space-y-1">
              {categories.map((category) => {
                const href = `/${category.name}`
                const isActive = currentPath.startsWith(href)

                return (
                  <li key={category.name}>
                    <Link
                      to="/$category"
                      params={{ category: category.name }}
                      className={cn(
                        'flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors text-foreground font-medium capitalize',
                        isActive ? 'bg-muted' : 'hover:bg-muted',
                      )}
                    >
                      <span>{category.name.replace(/-/g, ' ')}</span>
                      <span className="text-xs text-muted-foreground">
                        {category.total}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}
