# Ta!

El juego de palabras que te va a hacer gritar. Adivinás contra el tiempo, en equipos, pasando un solo celular de mano en mano (pass-and-play).

Inspirado en juegos tipo Contrarreloj / Time's Up, pero con reglas propias: 6 palabras abiertas por turno sin reposición, revisión manual al final del turno, y un tablero donde se avanza (o se retrocede) según un dado.

## Estado del proyecto

Este repo es la **Fase 1**: modo presencial, 100% cliente, sin backend ni cuentas. El roadmap completo tiene 4 fases (contenido curado, backend con mazos propios, y modo online con Socket.io más adelante), pero acá solo importa la Fase 1.

Lo que ya está jugable de punta a punta:

- Landing → selección de categoría → armado de equipos (con reparto parejo automático de jugadores) → partida.
- Turno activo: 6 palabras por turno, timer, marcar acertada/pasada, navegación libre entre las 6.
- Revisión manual post-turno (corregir palabras mal marcadas).
- Tirada de dado y tablero con la ficha moviéndose casilla por casilla.
- 12 categorías con mazos de palabras propios (nombres y lugares concretos, no categorías genéricas).

## Stack

- React 19 + Vite
- Tailwind CSS v4 (vía `@tailwindcss/vite`, sin archivo de config aparte)
- JavaScript puro, sin TypeScript

## Cómo correrlo

```bash
npm install
npm run dev
```

## Arquitectura: el motor de juego

La decisión de diseño más importante del proyecto: **el motor de juego es JavaScript puro, sin ninguna dependencia de React**. Ni un `import` de `react`, ni acceso a `document`/`window` en ningún archivo de `src/engine/`.

¿Por qué? Porque este mismo motor tiene que poder reutilizarse tal cual en una futura app de React Native, y eventualmente correr server-side como fuente de verdad autoritativa para el modo online (Fase 4, con Socket.io). Si la lógica del juego quedara mezclada con componentes de React, ese trabajo futuro implicaría reescribirla desde cero.

```
src/engine/
  state.js         # createInitialState(config) — arma el estado inicial
  reducer.js        # las reglas del juego: startTurn, markWord, tick, endTurn,
                     # reviewUpdateWord, confirmReview, rollDice, ackDiceResult
  gameReducer.js     # traduce acciones { type, ... } a las funciones de reducer.js
  rng.js             # wrapper de random inyectable (testeable, reemplazable)
  wordPool.js         # drawWords(pool, count, random) — sorteo de palabras
  data/
    wordPool.es.js     # mazos de palabras por categoría

src/hooks/
  useGameEngine.js    # el ÚNICO archivo que conecta el motor con React (useReducer)

src/components/
  landing/            # pantalla de inicio
  categorias/          # selección de mazo
  equipos/              # armado de equipos y jugadores
  juego/                 # JuegoPage (turno activo), ReviewTurno, DadoPage (dado + tablero)
```

Todo lo que React necesita del motor pasa por `dispatch({ type: "..." })` y por leer el `state` que devuelve `useGameEngine`. Ningún componente calcula reglas del juego por su cuenta (aciertos, posición en el tablero, fin de turno, etc.) — eso vive siempre en `engine/reducer.js`.

## Reglas del juego

- Cada equipo tiene sus jugadores y rota quién describe, con un índice propio por equipo (no global).
- Al empezar un turno se sortean 6 palabras del mazo de la categoría elegida, excluyendo las que ya salieron en la partida. Las 6 quedan abiertas a la vez, sin reposición.
- Hay un timer por turno. Si se acaba el tiempo, o si se resuelven las 6 palabras antes, el turno termina.
- Después viene una revisión manual: se puede corregir cualquier palabra antes de confirmar.
- Se tira un dado (0, 1 o 2), siempre, incluso con 0 aciertos. El resultado se resta a los aciertos del turno.
- El equipo avanza `aciertos - dado` casillas en el tablero (puede ser negativo: retroceder es parte del juego, no un error). La posición nunca baja de 0 ni supera el largo del tablero.
- Gana el primer equipo en llegar a la última casilla.
