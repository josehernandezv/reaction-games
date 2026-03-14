import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sound/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sound/"!</div>
}
