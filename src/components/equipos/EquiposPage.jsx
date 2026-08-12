import HourglassBackground from "../landing/HourglassBackground";
import title from "../../assets/title.png";
import { useState, useEffect } from "react";

const TEAM_THEMES = [
  { color: "#f4442e", textColor: "#fff7e8" },
  { color: "#ffc800", textColor: "#17313b" },
  { color: "#17313b", textColor: "#fff7e8" },
  { color: "#0f5462", textColor: "#fff7e8" },
];

const CARD_TILTS = ["rotate-1", "-rotate-2", "rotate-2", "-rotate-1"];

function distributeTeams(totalPlayers, teamCount) {
  const base = Math.floor(totalPlayers / teamCount);
  const remainder = totalPlayers % teamCount;
  return Array.from(
    { length: teamCount },
    (_, i) => base + (i < remainder ? 1 : 0),
  );
}

export default function EquiposPage({ categoria, onBack }) {
  const [players, setPlayers] = useState(4);
  const [teams, setTeams] = useState(2);
  const [playerNames, setPlayerNames] = useState(() =>
    distributeTeams(4, 2).map((size) => Array.from({ length: size }, () => "")),
  );
  const [showError, setShowError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    const total = Math.max(players, teams);
    if (total !== players) {
      setPlayers(total);
      return;
    }
    const teamSizes = distributeTeams(total, teams);
    setPlayerNames((prev) =>
      teamSizes.map((size, t) =>
        Array.from({ length: size }, (_, p) => prev[t]?.[p] ?? ""),
      ),
    );
  }, [teams, players]);

  function handlePlayerNameChange(teamIndex, playerIndex, value) {
    setPlayerNames((prev) => {
      const next = prev.map((team) => [...team]);
      next[teamIndex][playerIndex] = value;
      return next;
    });
    if (showError) setShowError(false);
  }

  function handlePlayersInc() {
    setPlayers(players + 1);
  }

  function handlePlayersDec() {
    if (players > teams) {
      setPlayers(players - 1);
    }
  }

  const completedCount = playerNames.flat().filter((n) => n.trim()).length;
  const totalCount = playerNames.flat().length;
  const allNamesComplete = completedCount === totalCount;

  function handleStart() {
    if (!allNamesComplete) {
      setShowError(true);
      setShakeKey((k) => k + 1);
      return;
    }
    setShowError(false);
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-[#0f5462] overflow-hidden">
      <HourglassBackground tone="light" />

      <nav className="relative w-full px-4 sm:px-6 py-3 sm:py-4 z-20">
        <div className="container mx-auto flex items-center justify-between">
          <img
            src={title}
            alt="Ta!"
            className="h-15 drop-shadow-lg transition-transform duration-150 group-hover:-rotate-3"
          />
        </div>
      </nav>
      <main className="relative container max-w-[750px] mx-auto pt-6 pb-20 px-4 flex flex-col items-center">
        <button
          onClick={onBack}
          className=" hover:cursor-pointer self-start mb-6 flex items-center gap-1.5 font-display font-bold text-sm text-[#17313b] bg-[#fff7e8] border-2 border-[#17313b] shadow-[0_3px_0_#17313b] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#17313b] active:translate-y-0.5 active:shadow-[0_1px_0_#17313b] transition-transform duration-150 rounded-full px-4 py-2 animate-[taPopIn_0.4s_ease-out_both]"
        >
          ← Categorías
        </button>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-block -rotate-2 font-cta text-xs px-4 py-1.5 rounded-full border-2 border-[#fff7e8] bg-[#f4442e] text-[#fff7e8] animate-[taPopIn_0.5s_ease-out_both]">
            Paso 2 de 4
          </span>
          {categoria && (
            <span
              style={{
                backgroundColor: categoria.color,
                color: categoria.textColor,
              }}
              className="inline-flex items-center gap-1.5 rotate-2 font-cta text-xs px-4 py-1.5 rounded-full border-2 border-[#17313b] animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.04s]"
            >
              <span className="text-sm leading-none">{categoria.emoji}</span>
              {categoria.name}
            </span>
          )}
        </div>

        <h1 className="text-[32px] sm:text-4xl md:text-5xl font-extrabold text-[#fff7e8] font-display text-center mb-2 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.08s]">
          ¿Cuántos son y cómo se llaman?
        </h1>
        <p className="font-display md:text-xl font-semibold text-[#fff7e8]/70 text-center mb-10 animate-[taPopIn_0.5s_ease-out_both] [animation-delay:0.16s]">
          Los repartimos en equipos parejos.
        </p>

        <div className="relative mb-6 w-full max-w-2xl bg-[#fff7e8] flex items-center justify-between mt-3 text-2xl font-cta text-[#17313b] py-8 px-6 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] gap-3 p-4 rounded-[40px]">
          <h3>Jugadores</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayersDec}
              className="w-10 h-10 flex bg-[#ffc800] items-center justify-center rounded-full border-2 border-[#17313b] shadow-inner transition-transform duration-200 hover:scale-110"
            >
              -
            </button>
            <span className="text-3xl font-bold w-8 text-center">
              {players}
            </span>
            <button
              onClick={handlePlayersInc}
              className="w-10 h-10 flex bg-[#ffc800] items-center justify-center rounded-full border-2 border-[#17313b] shadow-inner transition-transform duration-200 hover:scale-110"
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-10 font-cta flex gap-2 items-center justify-center">
          <p className="font-display md:text-xl font-semibold text-[#fff7e8]/70 text-center">
            Equipos:
          </p>
          <button
            onClick={() => setTeams(2)}
            className={`px-6 cursor-pointer py-2 font-bold rounded-full border-2 border-[#17313b] shadow-[0_4px_0_#17313b] hover:-translate-y-1 hover:shadow-[0_6px_0_#17313b] active:translate-y-1 active:shadow-[0_2px_0_#17313b] transition-transform duration-150 ${teams === 2 ? "bg-[#ffc800] text-[#17313b]" : "bg-[#fff7e8]/80 text-[#17313b]"}`}
          >
            2
          </button>
          <button
            onClick={() => setTeams(3)}
            className={`px-6 cursor-pointer py-2 font-bold rounded-full border-2 border-[#17313b] shadow-[0_4px_0_#17313b] hover:-translate-y-1 hover:shadow-[0_6px_0_#17313b] active:translate-y-1 active:shadow-[0_2px_0_#17313b] transition-transform duration-150 ${teams === 3 ? "bg-[#ffc800] text-[#17313b]" : "bg-[#fff7e8]/80 text-[#17313b]"}`}
          >
            3
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
          {playerNames.map((teamPlayers, t) => {
            const theme = TEAM_THEMES[t % TEAM_THEMES.length];
            return (
              <div
                key={t}
                style={{ backgroundColor: theme.color }}
                className={`flex flex-col gap-3 border-4 border-[#17313b] shadow-[0_8px_0_#17313b] rounded-[32px] p-5 ${CARD_TILTS[t % CARD_TILTS.length]} hover:rotate-0 hover:shadow-[0_10px_0_#17313b] transition-transform duration-200`}
              >
                <h3
                  style={{ color: theme.textColor }}
                  className="font-display font-extrabold text-2xl mb-1"
                >
                  Equipo {t + 1}
                </h3>
                {teamPlayers.map((name, p) => {
                  const isInvalid = showError && !name.trim();
                  return (
                    <input
                      key={`${shakeKey}-${p}`}
                      type="text"
                      value={name}
                      onChange={(e) =>
                        handlePlayerNameChange(t, p, e.target.value)
                      }
                      placeholder={`Jugador ${p + 1}`}
                      className={`w-full bg-[#fff7e8] text-[#17313b] font-display font-bold placeholder:text-[#17313b]/40 placeholder:font-semibold rounded-2xl border-2 px-4 py-3 focus:outline-none focus:ring-4 transition-shadow ${
                        isInvalid
                          ? "border-[#f4442e] ring-4 ring-[#f4442e]/50 animate-[taShake_0.4s_ease-in-out]"
                          : "border-[#17313b] focus:ring-[#ffc800]"
                      }`}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {showError && (
          <div className="mb-6 max-w-md w-full font-display font-bold text-center text-[#fff7e8] bg-[#f4442e] border-4 border-[#17313b] rounded-2xl px-5 py-3 animate-[taPopIn_0.3s_ease-out_both]">
            ⚠️ Faltan nombres: completá a los {totalCount - completedCount}{" "}
            jugador{totalCount - completedCount === 1 ? "" : "es"} antes de
            empezar.
          </div>
        )}

        <button
          onClick={handleStart}
          className="mt-3 px-10 mb-5 hover:cursor-pointer text-2xl font-cta text-[#17313B] py-5 border-4 border-[#17313B] shadow-[0_8px_0_#17313B] hover:-translate-y-1 hover:shadow-[0_12px_0_#17313B] active:translate-y-1 active:shadow-[0_2px_0_#17313B] transition-transform duration-150 bg-[#ffc800] rounded-full animate-[taPulse_2.4s_ease-in-out_infinite,taPopIn_0.6s_ease-out_both] [animation-delay:0.3s]"
        >
          Empezar a jugar
        </button>
        <p className="font-display md:text-xl font-semibold text-[#fff7e8]/70 text-center">
          {completedCount} de {totalCount} nombres completados
        </p>
      </main>
    </div>
  );
}
