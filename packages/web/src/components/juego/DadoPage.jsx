import { useState, useEffect } from "react";

const TEAM_COLORS = [
  { number: 1, name: "Rojo", color: "#f4442e" },
  { number: 2, name: "Amarillo", color: "#ffc800" },
  { number: 3, name: "Navy", color: "#17313b" },
];

const COLUMNAS = 3;

function construirFilas(boardLength) {
  const casillas = Array.from({ length: boardLength + 1 }, (_, i) => i);
  const filas = [];
  for (let i = 0; i < casillas.length; i += COLUMNAS) {
    const fila = casillas.slice(i, i + COLUMNAS);
    filas.push(filas.length % 2 === 1 ? [...fila].reverse() : fila);
  }
  return filas;
}

export default function DadoPage({ state, dispatch }) {
  const [dadoGirando, setDadoGirando] = useState(false);
  const [faseActual, setFaseActual] = useState("tirarDado"); // "tirarDado" | "resultado" | "tablero"
  const [posicionAnimada, setPosicionAnimada] = useState(null);

  const resultado = state.lastDiceResult;
  const boardLength = state.config.boardLength;
  const filas = construirFilas(boardLength);

  function handleTirarDado() {
    setDadoGirando(true);
    dispatch({ type: "ROLL_DICE" });
    setTimeout(() => {
      setDadoGirando(false);
      setFaseActual("resultado");
    }, 2000);
  }

  // Mueve la ficha casilla por casilla, como si contaras los pasos en el tablero.
  useEffect(() => {
    if (faseActual !== "tablero" || !resultado) return;

    const { previousPosition, newPosition } = resultado;
    setPosicionAnimada(previousPosition);
    if (previousPosition === newPosition) return;

    const paso = newPosition > previousPosition ? 1 : -1;
    let actual = previousPosition;

    const id = setInterval(() => {
      actual += paso;
      setPosicionAnimada(actual);
      if (actual === newPosition) clearInterval(id);
    }, 380);

    return () => clearInterval(id);
  }, [faseActual, resultado]);

  const posicionFicha = posicionAnimada ?? resultado?.previousPosition ?? 0;
  const llegoADestino = resultado && posicionFicha === resultado.newPosition;
  const gano = resultado && resultado.newPosition >= boardLength;

  return (
    <main className="relative container max-w-[750px] min-h-screen mx-auto py-6 px-4 flex flex-col items-center">
      {faseActual === "tablero" ? (
        <div className="flex w-full flex-wrap justify-center gap-2 animate-[taPopIn_0.5s_ease-out_both]">
          {state.teams.map((team, idx) => (
            <span
              key={team.id}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#17313b]/40 bg-[#17313b]/40 font-display font-bold text-[#fff7e8]"
            >
              <span
                className="h-3 w-3 rounded-full border-2 border-[#17313b]"
                style={{
                  backgroundColor: TEAM_COLORS[idx % TEAM_COLORS.length].color,
                }}
              />
              {team.name} ·{" "}
              {idx === state.currentTeamIndex ? posicionFicha : team.position}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex w-full justify-between items-center animate-[taPopIn_0.5s_ease-out_both]">
          <div className="flex items-center gap-2">
            <span
              className="h-5 w-5 rounded-full border-2 border-[#17313b] shrink-0"
              style={{
                backgroundColor: TEAM_COLORS[state.currentTeamIndex].color,
              }}
            />
            <div className="flex flex-col -space-y-1">
              <span className="font-bold font-display text-lg text-[#fff7e8]/70 ">
                Tira el dado
              </span>
              <h1 className="font-cta text-3xl text-[#ffc800]">
                {state.turn.descriptorPlayerName}
              </h1>
              <span className="font-display font-bold text-[#fff7e8] text-lg">
                {state.teams[state.currentTeamIndex].name}
              </span>
            </div>
          </div>
          <span className="rotate-2 px-4 py-2 rounded-full border-4 border-[#17313b] bg-[#ffc800] text-[#17313b] font-display font-bold text-lg shrink-0">
            🎲 Fase del dado
          </span>
        </div>
      )}

      <div className="w-full flex-1 flex flex-col justify-center items-center max-w-[480px] mb-5">
        {faseActual === "tirarDado" ? (
          <>
            <div className="h-35 my-10 w-full px-6 sm:px-10 flex flex-col -space-y-3 gap-4 items-center justify-center py-5 border-6 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#fff7e8] rounded-[40px] overflow-hidden animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.08s]">
              <p className="font-display font-bold text-lg text-[#17313b]/60 text-center">
                En esta ronda acertaron
              </p>
              <h1 className="font-cta text-center text-4xl text-[#0f6e56]">
                {
                  state.turn.words.filter((word) => word.status === "acertada")
                    .length
                }{" "}
                de {state.turn.words.length}
              </h1>
            </div>

            <div className="my-5 animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.16s]">
              <button
                className={`relative h-40 w-40 flex items-center justify-center border-6 border-[#17313B] bg-[#f4442e] rounded-[40px] overflow-hidden shadow-[inset_0_-10px_0_rgba(0,0,0,0.15),0_8px_0_#17313B] ${
                  dadoGirando
                    ? "animate-[taRoll_0.6s_ease-in-out_infinite]"
                    : "animate-[taPulse_1.8s_ease-in-out_infinite]"
                }`}
              >
                <span className="w-14 h-14 bg-[#fff7e8] rounded-full border-4 border-[#17313b]/20 shadow-[0_3px_0_rgba(0,0,0,0.2)]" />
              </button>
            </div>

            <button
              onClick={handleTirarDado}
              disabled={dadoGirando}
              className={`mt-10 w-full hover:cursor-pointer text-2xl font-cta text-[#17313b] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] transition-transform duration-150 bg-[#ffc800] rounded-full animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.24s] ${
                dadoGirando
                  ? "opacity-60"
                  : "hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B]"
              }`}
            >
              {dadoGirando ? "🎲 Girando..." : "🎲 Tirar dado"}
            </button>
          </>
        ) : faseActual === "resultado" ? (
          <>
            <div className="my-10 animate-[taPopIn_0.35s_ease-out_both]">
              <div className="h-40 w-40 flex items-center justify-center border-6 border-[#17313B] rounded-[40px] bg-[#f4442e] shadow-[inset_0_-10px_0_rgba(0,0,0,0.15),0_8px_0_#17313B]">
                <h1 className="font-cta text-7xl text-[#fff7e8]">
                  {resultado.value}
                </h1>
              </div>
            </div>

            <span className="w-full flex flex-col items-center gap-1 py-5 px-4 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#0f6e56] rounded-[30px] animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.15s]">
              <h1 className="font-cta text-2xl text-[#fff7e8] text-center">
                🚀 ¡Avanzás {resultado.delta} casillas!
              </h1>
              <p className="font-display font-semibold text-lg text-[#fff7e8]/70">
                casilla {resultado.previousPosition} → casilla{" "}
                {resultado.newPosition}
              </p>
            </span>

            <button
              onClick={() => setFaseActual("tablero")}
              className="mt-10 w-full hover:cursor-pointer text-2xl font-cta text-[#17313b] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#ffc800] rounded-full animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.3s]"
            >
              Ver tablero →
            </button>
          </>
        ) : faseActual === "tablero" ? (
          <>
            <div className="w-full my-8 p-4 border-6 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#0b3f4b] rounded-[32px] flex flex-col gap-6 animate-[taPopIn_0.4s_ease-out_both]">
              {filas.map((fila, f) => (
                <div key={f} className="grid grid-cols-3 gap-6">
                  {fila.map((n, c) => {
                    const esMeta = n === boardLength;
                    const esSalida = n === 0;
                    const tipoFila = f % 2 === 0 ? "normal" : "invertida";
                    const esUltimaFila =
                      tipoFila === "invertida"
                        ? f === 0
                        : f === filas.length - 1;
                    const esUltimaEnFila =
                      tipoFila === "invertida"
                        ? c === 0
                        : c === fila.length - 1;
                    const hayFilaSiguiente = f < filas.length - 1;
                    const vecinoHorizontal =
                      tipoFila === "invertida" ? fila[c - 1] : fila[c + 1];
                    const tieneFlechaHorizontal =
                      vecinoHorizontal !== undefined &&
                      (tipoFila === "invertida" ? c > 0 : c < fila.length - 1);
                    const equiposAca = state.teams
                      .map((team, idx) => ({ team, idx }))
                      .filter(({ team, idx }) =>
                        idx === state.currentTeamIndex
                          ? posicionFicha === n
                          : team.position === n,
                      );
                    return (
                      <div
                        key={n}
                        className="relative -z-2 aspect-square rounded-2xl border-4 flex items-center justify-center transition-colors duration-200"
                        style={{
                          backgroundColor: esMeta
                            ? "#ffc800"
                            : esSalida
                              ? "#0f6e56"
                              : "#fff7e8",
                          borderColor:
                            posicionFicha === n ? "#0f6e56" : "#17313b",
                          boxShadow:
                            posicionFicha === n ? "0 0 0 3px #0f6e56" : "none",
                        }}
                      >
                        {!esMeta && !esSalida && (
                          <span className="absolute top-1.5 left-2 font-mono text-xs font-bold text-[#17313b]/50">
                            {n}
                          </span>
                        )}
                        {esSalida && (
                          <span className="fixed -z-1 font-mono text-[10px] font-bold text-[#fff7e8]/80 tracking-wider">
                            SALIDA
                          </span>
                        )}
                        {esMeta && (
                          <div className="fixed -z-1 flex flex-col items-center gap-0.5">
                            <span className="text-xl leading-none">🏁</span>
                            <span className="font-mono text-[10px] font-bold text-[#17313b]/70 tracking-wider">
                              META
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-0.5 items-center justify-center">
                          {equiposAca.map(({ team, idx }) =>
                            idx === state.currentTeamIndex ? (
                              <span
                                key={`${team.id}-${posicionFicha}`}
                                className="h-8 w-8 rounded-full border-2 border-[#17313b] shadow-[0_2px_0_rgba(0,0,0,0.25)] animate-[taHop_0.35s_ease-out]"
                                style={{
                                  backgroundColor:
                                    TEAM_COLORS[idx % TEAM_COLORS.length].color,
                                }}
                              />
                            ) : (
                              <span
                                key={team.id}
                                className="h-8 w-8 rounded-full border-2 border-[#17313b] shadow-[0_2px_0_rgba(0,0,0,0.25)]"
                                style={{
                                  backgroundColor:
                                    TEAM_COLORS[idx % TEAM_COLORS.length].color,
                                }}
                              />
                            ),
                          )}
                        </div>

                        {tieneFlechaHorizontal && (
                          <span
                            className="absolute top-1/2 -translate-y-1/2 text-[#fff7e8]/90 text-lg leading-none z-10"
                            style={
                              tipoFila === "invertida"
                                ? { left: "-22px" }
                                : { right: "-22px" }
                            }
                          >
                            {tipoFila === "invertida" ? "◀" : "▶"}
                          </span>
                        )}

                        {esUltimaEnFila &&
                          hayFilaSiguiente &&
                          !esUltimaFila && (
                            <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 text-[#fff7e8]/90 text-2xl leading-none z-10">
                              ▼
                            </span>
                          )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <span
              className="w-full flex flex-col items-center gap-1 py-5 px-4 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] rounded-[30px] transition-colors duration-300"
              style={{
                backgroundColor: llegoADestino
                  ? gano
                    ? "#ffc800"
                    : "#0f6e56"
                  : "#17313b",
              }}
            >
              <h1
                className="font-cta text-xl text-center"
                style={{ color: gano && llegoADestino ? "#17313b" : "#fff7e8" }}
              >
                {!llegoADestino
                  ? "Moviendo ficha..."
                  : gano
                    ? "🏆 ¡Llegó a la meta!"
                    : `📍 Casilla ${resultado.newPosition} de ${boardLength}`}
              </h1>
              <p
                className="font-display font-semibold text-lg text-center"
                style={{
                  color:
                    gano && llegoADestino ? "#17313b" : "rgba(255,247,232,0.7)",
                }}
              >
                {llegoADestino
                  ? `${state.teams[state.currentTeamIndex].name} ${
                      resultado.delta >= 0 ? "avanzó" : "retrocedió"
                    } ${Math.abs(resultado.delta)} desde la ${
                      resultado.previousPosition
                    }`
                  : state.teams[state.currentTeamIndex].name}
              </p>
            </span>

            <button
              onClick={() => dispatch({ type: "ACK_DICE_RESULT" })}
              disabled={!llegoADestino}
              className={`mt-8 w-full text-2xl font-cta text-[#17313b] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] transition-all duration-150 bg-[#ffc800] rounded-full ${
                llegoADestino
                  ? "hover:cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B]"
                  : "opacity-40"
              }`}
            >
              Siguiente turno →
            </button>
          </>
        ) : null}
      </div>
    </main>
  );
}
