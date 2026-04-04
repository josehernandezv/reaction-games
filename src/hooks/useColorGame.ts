import type { ColorGameParams } from '#/routes/color/game'
import type { Color } from '#/lib/consts'
import { ATTACK_OPTIONS, COLOR_OPTIONS } from '#/lib/consts'
import { useCountdown } from './useCountdown'
import { useSound } from './useSound'
import bell from '#/assets/bell.mp3'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

const ATTACK_LABEL_CHANCE = 0.25

const COLOR_VALUES = COLOR_OPTIONS.map((c) => c.value)

function randomIndex(length: number) {
  return Math.floor(Math.random() * length)
}

function pickForegroundBackground(): { fg: Color; bg: Color } {
  const fg = COLOR_VALUES[randomIndex(COLOR_VALUES.length)]
  let bg = COLOR_VALUES[randomIndex(COLOR_VALUES.length)]
  while (fg === bg) {
    bg = COLOR_VALUES[randomIndex(COLOR_VALUES.length)]
  }
  return { fg, bg }
}

function pickDisplayName(nameAttacks: boolean): string {
  const showAttackLabel = Math.random() < ATTACK_LABEL_CHANCE
  if (showAttackLabel) {
    return nameAttacks
      ? ATTACK_OPTIONS[randomIndex(ATTACK_OPTIONS.length)]
      : 'Ataque'
  }
  return COLOR_OPTIONS[randomIndex(COLOR_OPTIONS.length)].label
}

function pickColorCombo(
  prevKey: string | null,
  nameAttacks: boolean,
): { color: Color; backgroundColor: Color; name: string; key: string } {
  const maxAttempts = 80
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const { fg, bg } = pickForegroundBackground()
    const name = pickDisplayName(nameAttacks)
    const key = `${fg}|${bg}|${name}`
    if (prevKey === null || key !== prevKey) {
      return {
        color: fg,
        backgroundColor: bg,
        name,
        key,
      }
    }
  }
  const { fg, bg } = pickForegroundBackground()
  for (const opt of COLOR_OPTIONS) {
    const name = opt.label
    const key = `${fg}|${bg}|${name}`
    if (prevKey === null || key !== prevKey) {
      return { color: fg, backgroundColor: bg, name, key }
    }
  }
  throw new Error('pickColorCombo: could not sample a new combo')
}

export function useColorGame({
  duration,
  interval,
  nameAttacks,
}: ColorGameParams) {
  const { countdown } = useCountdown()
  const bellSound = useSound(bell)
  const [timeRemaining, setTimeRemaining] = useState<number>(duration)
  const [currentColor, setCurrentColor] = useState<Color>('white')
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState<Color>('black')
  const [currentName, setCurrentName] = useState<string>('Rojo')
  const timeRemainingRef = useRef(timeRemaining)
  const prevComboKeyRef = useRef<string | null>(null)
  const navigate = useNavigate()
  timeRemainingRef.current = timeRemaining

  // Tick game timer down every second
  useEffect(() => {
    if (countdown !== 0) return

    if (timeRemaining === 0) {
      bellSound.playSound()
      const t = setTimeout(() => {
        navigate({
          to: '/color',
        })
      }, 1000)
      return () => clearTimeout(t)
    }
    if (timeRemaining <= 0) return
    const t = setTimeout(() => setTimeRemaining((prev) => prev - 1), 1000)
    return () => clearTimeout(t)
  }, [timeRemaining, countdown, bellSound, navigate])

  useEffect(() => {
    if (countdown !== 0) return

    const applyPick = () => {
      if (timeRemainingRef.current <= 0) return
      const next = pickColorCombo(prevComboKeyRef.current, nameAttacks)
      prevComboKeyRef.current = next.key
      setCurrentColor(next.color)
      setCurrentBackgroundColor(next.backgroundColor)
      setCurrentName(next.name)
    }

    applyPick()
    const id = setInterval(applyPick, interval * 1000)
    return () => clearInterval(id)
  }, [countdown, interval, nameAttacks])

  return {
    countdown,
    color: currentColor,
    backgroundColor: currentBackgroundColor,
    name: currentName,
  }
}
