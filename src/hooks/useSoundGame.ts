import { useEffect, useRef, useState } from 'react'
import { useSound } from './useSound'
import bell from '#/assets/bell.mp3'
import whistle from '#/assets/whistle.mp3'
import type { SoundGameParams } from '#/routes/sound/game'
import { useNavigate } from '@tanstack/react-router'
import { useCountdown } from './useCountdown'

function randomBetweenMinMax(minSeconds: number, maxSeconds: number): number {
  return Math.random() * (maxSeconds - minSeconds) + minSeconds
}

export function useSoundGame({
  duration,
  minInterval,
  maxInterval,
}: SoundGameParams) {
  const bellSound = useSound(bell)
  const whistleSound = useSound(whistle)
  const [timeRemaining, setTimeRemaining] = useState<number>(duration)
  const { countdown } = useCountdown()
  const navigate = useNavigate()
  const whistleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timeRemainingRef = useRef(timeRemaining)
  const whistlePlayRef = useRef(whistleSound.playSound)
  timeRemainingRef.current = timeRemaining
  whistlePlayRef.current = whistleSound.playSound

  // Tick game timer down every second
  useEffect(() => {
    if (countdown !== 0) return

    if (timeRemaining === 0) {
      bellSound.playSound()
      const t = setTimeout(() => {
        navigate({
          to: '/sound',
        })
      }, 1000)
      return () => clearTimeout(t)
    }
    if (timeRemaining <= 0) return
    const t = setTimeout(() => setTimeRemaining((prev) => prev - 1), 1000)
    return () => clearTimeout(t)
  }, [timeRemaining, countdown, bellSound, navigate])

  // Schedule whistle at random intervals while game is running (only when countdown hits 0)
  useEffect(() => {
    if (countdown !== 0 || timeRemaining <= 0) return

    const scheduleNextWhistle = () => {
      if (timeRemainingRef.current <= 0) return
      const delayMs = randomBetweenMinMax(minInterval, maxInterval) * 1000
      whistleTimeoutRef.current = setTimeout(() => {
        if (timeRemainingRef.current <= 0) return
        whistlePlayRef.current()
        scheduleNextWhistle()
      }, delayMs)
    }

    scheduleNextWhistle()
    return () => {
      if (whistleTimeoutRef.current) {
        clearTimeout(whistleTimeoutRef.current)
        whistleTimeoutRef.current = null
      }
    }
  }, [countdown, minInterval, maxInterval])

  return { countdown, timeRemaining }
}
