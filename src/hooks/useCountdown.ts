import { useEffect, useRef, useState } from 'react'
import { useSound } from './useSound'
import bell from '#/assets/bell.mp3'

const COUNTDOWN_START = 3

export function useCountdown() {
  const bellSound = useSound(bell)
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_START)
  const hasStarted = useRef(false)
  const hasFinished = useRef(false)

  // Start countdown on mount
  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    setCountdown(COUNTDOWN_START)
  }, [bellSound])

  // When countdown reaches 0, play bell
  useEffect(() => {
    if (countdown !== 0 || hasFinished.current) return
    bellSound.playSound()
    hasFinished.current = true
  }, [countdown, bellSound])

  // Tick countdown every second
  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  return { countdown }
}
