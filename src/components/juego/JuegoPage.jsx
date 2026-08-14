import HourglassBackground from "../landing/HourglassBackground";
import { useGameEngine } from "../../hooks/useGameEngine";
import { useState, useEffect } from "react";
import ReviewTurno from "./ReviewTurno";
import DadoPage from "./DadoPage";

const TEAM_COLORS = [
  { number: 1, name: "Rojo", color: "#f4442e" },
  { number: 2, name: "Amarillo", color: "#ffc800" },
  { number: 3, name: "Azul", color: "#17313b" },
];

export default function JuegoPage({ config, onExit }) {
  const { state, dispatch } = useGameEngine(config);
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = state.turn.words[wordIndex];
  const timeRemaining = state.turn.timeRemaining;
  const isUrgent = timeRemaining <= 10;

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  function markCurrentWord(status) {
    dispatch({ type: "MARK_WORD", wordId: currentWord.id, status });
    setWordIndex((prev) => Math.min(5, prev + 1));
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#0f5462] overflow-hidden">
      <HourglassBackground tone="light" />
      {state.phase === "turnActive" ? (
        <main className="relative container max-w-[750px] mx-auto pt-6 pb-20 px-4 flex flex-col items-center">
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
                  Describe
                </span>
                <h1 className="font-cta text-3xl text-[#ffc800]">
                  {state.turn.descriptorPlayerName}
                </h1>
                <span className="font-display font-bold text-[#fff7e8] text-lg">
                  {state.teams[state.currentTeamIndex].name}
                </span>
              </div>
            </div>
            <span className="-rotate-2 px-4 py-2 rounded-full border-4 border-[#17313b] bg-[#ffc800] text-[#17313b] font-display font-bold text-lg shrink-0">
              Ronda {state.turnNumber}
            </span>
          </div>

          <div className="mt-3 mb-5 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.08s]">
            <div
              className={`px-10 text-6xl font-cta py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] rounded-full transition-colors duration-300 ${
                isUrgent
                  ? "bg-[#f4442e] text-[#fff7e8] animate-[taPulse_0.6s_ease-in-out_infinite]"
                  : "bg-[#fff7e8] text-[#f4442e]"
              }`}
            >
              {Math.floor(timeRemaining / 60)}:
              {String(timeRemaining % 60).padStart(2, "0")}
            </div>
          </div>

          <div className="w-full max-w-[480px] mb-5 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.16s]">
            <div className="h-64 sm:h-80 w-full px-6 sm:px-10 flex flex-col gap-4 items-center justify-center py-5 border-6 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#f4442e] rounded-[40px] overflow-hidden">
              <p className="font-display font-bold text-lg text-[#fff7e8]/70">
                Palabra {wordIndex + 1} de {state.turn.words.length}
              </p>
              <h1
                key={currentWord.id}
                className="font-cta text-center text-4xl sm:text-5xl uppercase text-[#fff7e8] animate-[taPopIn_0.25s_ease-out_both]"
              >
                {currentWord.text}
              </h1>
            </div>
          </div>

          <div className="flex w-full mb-8 justify-center gap-3 items-center animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.24s]">
            <button
              onClick={() => setWordIndex((prev) => Math.max(0, prev - 1))}
              className="px-4 py-4 rounded-full border-4 border-[#17313b] bg-[#fff7e8] text-[#17313b] font-display font-bold text-lg shadow-[0_6px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M208,72H128V32a8,8,0,0,0-13.66-5.66l-96,96a8,8,0,0,0,0,11.32l96,96A8,8,0,0,0,128,224V184h80a16,16,0,0,0,16-16V88A16,16,0,0,0,208,72Zm0,96H120a8,8,0,0,0-8,8v28.69L35.31,128,112,51.31V80a8,8,0,0,0,8,8h88Z"></path>
              </svg>
            </button>
            {state.turn.words.map((word, i) => (
              <span
                key={word.id}
                className="h-6 w-6 rounded-full border-2 border-[#17313b] transition-all duration-200"
                style={{
                  backgroundColor:
                    i === wordIndex
                      ? "#ffc800"
                      : word.status === "acertada"
                        ? "#0f6e56"
                        : word.status === "fallada"
                          ? "#f4442e"
                          : "#fff7e8",
                  transform: i === wordIndex ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
            <button
              onClick={() => setWordIndex((prev) => Math.min(5, prev + 1))}
              className="px-4 py-4 rounded-full border-4 border-[#17313b] bg-[#fff7e8] text-[#17313b] font-display font-bold text-lg shadow-[0_6px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <path d="M237.66,122.34l-96-96A8,8,0,0,0,128,32V72H48A16,16,0,0,0,32,88v80a16,16,0,0,0,16,16h80v40a8,8,0,0,0,13.66,5.66l96-96A8,8,0,0,0,237.66,122.34ZM144,204.69V176a8,8,0,0,0-8-8H48V88h88a8,8,0,0,0,8-8V51.31L220.69,128Z"></path>
              </svg>
            </button>
          </div>

          <div className="w-full max-w-[460px] flex flex-col gap-3 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.32s]">
            <button
              onClick={() => markCurrentWord("acertada")}
              className="hover:cursor-pointer text-2xl font-cta text-[#fff7e8] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#0f6e56] rounded-full"
            >
              ✓ ¡Acertada!
            </button>
            <button
              onClick={() => markCurrentWord("fallada")}
              className="hover:cursor-pointer text-xl font-cta text-[#17313b] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#fff7e8]/70 rounded-full"
            >
              ✕ Pasar
            </button>
          </div>
        </main>
      ) : state.phase === "turnReview" ? (
        <ReviewTurno state={state} dispatch={dispatch} />
      ) : state.phase === "diceRoll" ? (
        <DadoPage state={state} dispatch={dispatch} />
      ) : null}
    </div>
  );
}
