const TEAM_COLORS = [
  { number: 1, name: "Rojo", color: "#f4442e" },
  { number: 2, name: "Amarillo", color: "#ffc800" },
  { number: 3, name: "Navy", color: "#17313b" },
];

const MEDALLAS = ["🥇", "🥈", "🥉"];

export default function GameOverPage({ state, onExit }) {
  const ganador = state.teams.find((team) => team.id === state.winnerTeamId);

  const posiciones = state.teams
    .map((team, idx) => ({ team, idx }))
    .sort((a, b) => b.team.position - a.team.position);

  return (
    <main className="relative container max-w-[750px] min-h-screen mx-auto py-6 px-4 flex flex-col items-center justify-center">
      <span className="-rotate-2 px-4 py-2 mb-6 rounded-full border-4 border-[#17313b] bg-[#ffc800] text-[#17313b] font-display font-bold text-lg animate-[taPopIn_0.5s_ease-out_both]">
        🏆 Fin de la partida
      </span>

      <div className="w-full max-w-[480px] flex flex-col items-center gap-2 py-10 px-6 border-6 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#ffc800] rounded-[40px] animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.1s]">
        <span className="text-6xl animate-[taFloat_3s_ease-in-out_infinite]">
          🏆
        </span>
        <h1 className="font-cta text-3xl text-[#17313b] text-center mt-2">
          {ganador.name}
        </h1>
        <p className="font-display font-bold text-lg text-[#17313b]/70 text-center">
          ¡Llegó primero a la meta!
        </p>
      </div>

      <div className="w-full max-w-[480px] mt-6 flex flex-col gap-3 animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.2s]">
        <p className="font-display font-bold text-lg text-[#fff7e8]/70">
          Tablero final
        </p>
        {posiciones.map(({ team, idx }, rank) => (
          <div
            key={team.id}
            style={{
              animationDelay: `${0.28 + rank * 0.08}s`,
              backgroundColor:
                team.id === ganador.id ? "#0f6e56" : "#fff7e8",
              color: team.id === ganador.id ? "#fff7e8" : "#17313b",
            }}
            className="flex items-center justify-between py-4 px-5 border-4 border-[#17313B] shadow-[0_6px_0_#17313B] rounded-[22px] animate-[taPopIn_0.4s_ease-out_both]"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl leading-none">
                {MEDALLAS[rank] ?? "🎖️"}
              </span>
              <span
                className="h-4 w-4 rounded-full border-2 border-[#17313b] shrink-0"
                style={{
                  backgroundColor: TEAM_COLORS[idx % TEAM_COLORS.length].color,
                }}
              />
              <span className="font-display font-bold text-lg">
                {team.name}
              </span>
            </div>
            <span className="font-cta text-lg">
              casilla {team.position} de {state.config.boardLength}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onExit}
        className="mt-10 w-full max-w-[480px] hover:cursor-pointer text-2xl font-cta text-[#17313b] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#ffc800] rounded-full animate-[taPopIn_0.4s_ease-out_both] [animation-delay:0.5s]"
      >
        Volver al inicio
      </button>
    </main>
  );
}
