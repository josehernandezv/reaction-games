import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/color/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/color/game"!</div>
}
