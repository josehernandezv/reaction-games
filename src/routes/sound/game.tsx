import { createFileRoute } from '@tanstack/react-router'
import { useSoundGame } from '#/hooks/useSoundGame'
import { formatTime } from '#/lib/utils'

export type SoundGameParams = {
  duration: number
  minInterval: number
  maxInterval: number
}

export const Route = createFileRoute('/sound/game')({
  component: RouteComponent,
  validateSearch: (search: Record<string, string>): SoundGameParams => {
    return {
      duration: Number(search.duration),
      minInterval: Number(search.minInterval),
      maxInterval: Number(search.maxInterval),
    }
  },
})

function RouteComponent() {
  const { duration, minInterval, maxInterval } = Route.useSearch()
  const { countdown, timeRemaining } = useSoundGame({
    duration,
    minInterval,
    maxInterval,
  })
  return (
    <div className="flex flex-col items-center justify-center h-screen font-mono">
      {countdown > 0 ? (
        <span className="text-9xl font-bold tabular-nums">{countdown}</span>
      ) : (
        <span className="text-9xl font-bold tabular-nums">
          {formatTime(timeRemaining)}
        </span>
      )}
    </div>
  )
}
