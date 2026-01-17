import { DocsSidebar } from '@/components/docs-sidebar'
import { NotFound } from '@/components/not-found'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs')({
  component: DocsLayout,
  notFoundComponent: NotFound,
})

function DocsLayout() {
  return (
    <div className="flex bg-background max-w-340 mx-auto gap-10 px-4 sm:px-6 lg:px-10">
      <DocsSidebar />
      <main className="flex-1 max-w-2xl mx-auto">
        <Outlet />
      </main>
      <div className="w-50" />
    </div>
  )
}
