import { getCategories } from '@/data/skills'
import { cn } from '@/lib/utils'
import { Link, useRouterState } from '@tanstack/react-router'

export function DocsSidebar() {
  const router = useRouterState()
  const currentPath = router.location.pathname

  const categories = getCategories()

  return (
    <aside className="sticky left-0 top-16 z-40 h-[calc(100vh-4rem)] w-50 bg-background -ml-2 py-4 sm:py-6 lg:py-8">
      <div className="flex h-full flex-col overflow-y-auto">
        <nav className="space-y-6">
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
              Categories
            </h3>
            <ul className="space-y-1">
              {categories.map((category) => {
                const categoryTitle = category
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
                const href = `/${category}`
                const isActive = currentPath.startsWith(href)

                return (
                  <li key={category}>
                    <Link
                      to="/$category"
                      params={{ category }}
                      className={cn(
                        'block rounded-md px-2 py-1 text-sm transition-colors text-foreground font-medium',
                        isActive ? 'bg-muted' : 'hover:bg-muted',
                      )}
                    >
                      {categoryTitle}
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
