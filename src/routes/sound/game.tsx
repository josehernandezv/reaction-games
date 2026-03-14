import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sound/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sound/game"!</div>
}
