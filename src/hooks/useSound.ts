import { useEffect, useRef } from 'react'

export function useSound(src: string) {
  const soundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    soundRef.current = new Audio(src)
  }, [])

  const playSound = () => {
    soundRef.current?.play()
  }

  const pauseSound = () => {
    soundRef.current?.pause()
  }

  return { playSound, pauseSound }
}
