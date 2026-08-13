export default function ReviewTurno({ state, dispatch }) {
  const TEAM_COLORS = [
    { number: 1, name: "Rojo", color: "#f4442e" },
    { number: 2, name: "Amarillo", color: "#ffc800" },
    { number: 3, name: "Azul", color: "#17313b" },
  ];

  const cantAcertadas = state.turn.words.filter(
    (word) => word.status === "acertada",
  ).length;

  return (
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
          ⌛ Tiempo!
        </span>
      </div>
      <div className="w-full max-w-[480px] mb-5 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.16s]">
        <div className="h-50 my-10 w-full px-6 sm:px-10 flex flex-col -space-y-3 gap-4 items-center justify-center py-5 border-6 border-[#17313B] shadow-[0_8px_0_#17313B] bg-[#fff7e8] rounded-[40px] overflow-hidden">
          <p className="font-display font-bold text-lg text-gray-500 text-center">
            Resultado de la ronda
          </p>
          <h1 className="font-cta text-center text-4xl  text-[#17313b] animate-[taPopIn_0.25s_ease-out_both]">
            <span className="text-6xl text-[#0f6e56]">{cantAcertadas}</span> de
            6
          </h1>
          <p className="font-display font-bold text-lg text-gray-800 text-center">
            acertadas
          </p>
        </div>
        <div className="flex w-full  flex-col gap-2">
          <p className="font-display font-bold text-lg text-[#fff7e8]/70 ">
            Tocá una palabra para corregirla
          </p>
          <ul className="flex flex-col gap-4">
            {state.turn.words.map((word) => (
              <li
                key={word.id}
                className="border-6 py-5 px-4 border-[#17313B] shadow-[0_8px_0_#17313B]  rounded-[25px]"
                style={{
                  backgroundColor:
                    word.status === "acertada"
                      ? "#0f6e56"
                      : word.status === "fallada"
                        ? "#f4442e"
                        : "#fff7e8",
                  color: word.status === "pendiente" ? "#17313b" : "#fff7e8",
                }}
                onClick={() => {
                  dispatch({
                    type: "toggleWordStatus",
                    payload: { wordId: word.id },
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-display bg-[#fff7e8] py-1 px-3 border-3 border-[#17313b] rounded-full font-bold text-xl"
                      style={{
                        color:
                          word.status === "acertada"
                            ? "#0f6e56"
                            : word.status === "fallada"
                              ? "#f4442e"
                              : "#b7900a",
                      }}
                    >
                      {word.status === "acertada"
                        ? "✓"
                        : word.status === "fallada"
                          ? "✗"
                          : "?"}
                    </span>
                    <h2 className="font-display uppercase font-bold text-lg text-[#17313b]">
                      {word.text}
                    </h2>
                  </div>
                  <p className="font-display font-semibold text-[#17313b]/70">
                    {word.status === "acertada"
                      ? "Acertada"
                      : word.status === "fallada"
                        ? "Pasada"
                        : "Sin jugar"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button className=" mt-10 hover:cursor-pointer text-2xl font-cta text-[#fff7e8] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#f4442e] rounded-full">
            Confirmar
          </button>
        </div>
      </div>
    </main>
  );
}
