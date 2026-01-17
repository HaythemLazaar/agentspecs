import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_docs/introduction')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_docs/introduction"!</div>
}
