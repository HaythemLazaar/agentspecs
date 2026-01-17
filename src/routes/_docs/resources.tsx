import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs/resources')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_docs/resources"!</div>
}
