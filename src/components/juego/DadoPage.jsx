import { useState } from "react";

const TEAM_COLORS = [
  { number: 1, name: "Rojo", color: "#f4442e" },
  { number: 2, name: "Amarillo", color: "#ffc800" },
  { number: 3, name: "Azul", color: "#17313b" },
];

export default function DadoPage({ state, dispatch }) {
  const [dadoGirando, setDadoGirando] = useState(false);
  const [faseActual, setFaseActual] = useState("tirarDado"); // "tirarDado" o "resultado"
  function handleTirarDado() {
    setDadoGirando(true);
    dispatch({ type: "ROLL_DICE" });
    setTimeout(() => {
      setDadoGirando(false);
      setFaseActual("resultado");
    }, 2000);
  }
  return (
    <main className="relative container max-w-[750px] min-h-screen mx-auto py-6 px-4 flex flex-col items-center">
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

      <div className="w-full flex-1 flex flex-col justify-center items-center max-w-[480px] mb-5">
        {faseActual === "tirarDado" ? (
          <>
            <div className="h-35 my-10 w-full px-6 sm:px-10 flex flex-col -space-y-3 gap-4 items-center justify-center py-5 border-6 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#fff7e8] rounded-[40px] overflow-hidden animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.08s]">
              <p className="font-display font-bold text-lg text-[#17313b]/60 text-center">
                En esta ronda acertaron
              </p>
              <h1 className="font-cta text-center text-4xl text-[#0f6e56]">
                5 aciertos
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
                <h1 className="font-cta text-7xl text-[#fff7e8]">2</h1>
              </div>
            </div>

            <span className="w-full flex flex-col items-center gap-1 py-5 px-4 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#0f6e56] rounded-[30px] animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.15s]">
              <h1 className="font-cta text-2xl text-[#fff7e8] text-center">
                🚀 ¡Avanzás 4 casillas!
              </h1>
              <p className="font-display font-semibold text-lg text-[#fff7e8]/70">
                casilla 8 → casilla 12
              </p>
            </span>

            <button
              onClick={() => {
                dispatch({ type: "ACK_DICE_RESULT" });
              }}
              className="mt-10 w-full hover:cursor-pointer text-2xl font-cta text-[#17313b] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#ffc800] rounded-full animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.3s]"
            >
              Continuar →
            </button>
          </>
        ) : null}
      </div>
    </main>
  );
}
