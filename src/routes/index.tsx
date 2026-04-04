import {
  Item,
  ItemContent,
  ItemGroup,
  ItemActions,
  ItemTitle,
} from '#/components/ui/item'
import { CaretRightIcon } from '@phosphor-icons/react'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="container mx-auto p-6 min-h-svh flex items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold text-center">Juegos de Reacción</h1>
      <p className="text-lg text-muted-foreground">
        Selecciona un juego para empezar.
      </p>
      <ItemGroup className="max-w-sm">
        <Item variant="outline" size="sm" asChild>
          <Link to="/sound">
            <ItemContent>
              <ItemTitle>Juego de Sonido</ItemTitle>
            </ItemContent>
            <ItemActions>
              <CaretRightIcon className="size-4" />
            </ItemActions>
          </Link>
        </Item>
        <Item variant="outline" size="sm" asChild>
          <Link to="/color">
            <ItemContent>
              <ItemTitle>Juego de Color</ItemTitle>
            </ItemContent>
            <ItemActions>
              <CaretRightIcon className="size-4" />
            </ItemActions>
          </Link>
        </Item>
      </ItemGroup>
    </main>
  )
}
