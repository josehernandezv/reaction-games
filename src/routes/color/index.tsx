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
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DURATION_OPTIONS, INTERVAL_OPTIONS } from '#/lib/consts'
import { useState } from 'react'
import { Checkbox } from '#/components/ui/checkbox'

export const Route = createFileRoute('/color/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [duration, setDuration] = useState(DURATION_OPTIONS[3].value)
  const [interval, setInterval] = useState(INTERVAL_OPTIONS[3].value)
  const [nameAttacks, setNameAttacks] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate({
      to: '/color/game',
      search: {
        duration,
        interval,
        nameAttacks,
      },
    })
  }
  return (
    <main className="container mx-auto p-6 min-h-svh flex items-center justify-center flex-col">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Juego de Color</CardTitle>
            <CardDescription>
              Durante un período de tiempo cada X segundos se mostrará el nombre
              de un color en un color aleatorio y un fondo aleatorio distinto.
              También podrán aparecer ataques.
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
                  <FieldLabel>Intervalo</FieldLabel>
                  <Select
                    value={interval.toString()}
                    onValueChange={(value) => setInterval(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el intervalo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {INTERVAL_OPTIONS.map((option) => (
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
                <Field orientation="horizontal">
                  <Checkbox
                    id="name-attacks"
                    checked={nameAttacks}
                    onCheckedChange={(checked) =>
                      setNameAttacks(Boolean(checked))
                    }
                  />
                  <FieldLabel htmlFor="name-attacks" className="font-normal">
                    Nombrar ataques
                  </FieldLabel>
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
