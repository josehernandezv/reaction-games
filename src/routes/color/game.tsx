import { useColorGame } from '#/hooks/useColorGame'
import { createFileRoute } from '@tanstack/react-router'

export type ColorGameParams = {
  duration: number
  interval: number
  nameAttacks: boolean
}

export const Route = createFileRoute('/color/game')({
  component: RouteComponent,
  validateSearch: (search: Record<string, string>): ColorGameParams => {
    return {
      duration: Number(search.duration),
      interval: Number(search.interval),
      nameAttacks: Boolean(search.nameAttacks),
    }
  },
})

function RouteComponent() {
  const { duration, interval, nameAttacks } = Route.useSearch()
  const { countdown, color, backgroundColor, name } = useColorGame({
    duration,
    interval,
    nameAttacks,
  })
  return (
    <div
      className="flex flex-col items-center justify-center h-screen font-mono"
      style={{ backgroundColor }}
    >
      {countdown > 0 ? (
        <span className="text-9xl font-bold tabular-nums">{countdown}</span>
      ) : (
        <span className="text-9xl font-black text-shadow-md" style={{ color }}>
          {name}
        </span>
      )}
    </div>
  )
}
