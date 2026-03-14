import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DURATION_OPTIONS } from '#/lib/consts'
import { useState } from 'react'
import { Slider } from '#/components/ui/slider'

export const Route = createFileRoute('/sound/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [duration, setDuration] = useState(DURATION_OPTIONS[3].value)
  const [intervalRange, setIntervalRange] = useState([1, 6])
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate({
      to: '/sound/game',
      search: {
        duration,
        minInterval: intervalRange[0],
        maxInterval: intervalRange[1],
      },
    })
  }
  return (
    <main className="container mx-auto p-6 min-h-svh flex items-center justify-center flex-col">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Juego de Sonido</CardTitle>
            <CardDescription>
              Durante un período de tiempo en distintos intervalos sonará un
              pitido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel>Duración</FieldLabel>
                  <Select
                    value={duration.toString()}
                    onValueChange={(value) => setDuration(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {DURATION_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value.toString()}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Rango de intervalos</FieldLabel>
                  <FieldDescription>
                    Rango de intervalos de sonido({intervalRange[0]}seg -{' '}
                    {intervalRange[1]}seg).
                  </FieldDescription>
                  <Slider
                    value={intervalRange}
                    onValueChange={(value) =>
                      setIntervalRange(value as [number, number])
                    }
                    max={duration}
                    min={0}
                    step={1}
                    className="mt-2 w-full"
                    aria-label="Rango de intervalos de sonido"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Iniciar
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/">Volver al menú principal</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  )
}
