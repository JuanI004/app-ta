import { useState } from "react";
import Landing from "./components/landing/Landing";
import CategoriasPage from "./components/categorias/CategoriasPage";
import EquiposPage from "./components/equipos/EquiposPage";
import JuegoPage from "./components/juego/JuegoPage";
import WORD_POOLS_ES from "../../engine/src/data/wordPool.es";

function App() {
  const [screen, setScreen] = useState("landing");
  const [sessionInfo, setSessionInfo] = useState({
    categoria: null,
    teams: null,
  });

  function handleSelectCategoria(categoria) {
    setSessionInfo((prev) => ({ ...prev, categoria }));
    setScreen("equipos");
  }

  return screen === "landing" ? (
    <Landing onJugar={() => setScreen("categorias")} />
  ) : screen === "categorias" ? (
    <CategoriasPage
      onBack={() => setScreen("landing")}
      onSelectCategoria={handleSelectCategoria}
    />
  ) : screen === "equipos" ? (
    <EquiposPage
      categoria={sessionInfo.categoria}
      onBack={() => setScreen("categorias")}
      onStartGame={(teams) => {
        setSessionInfo((prev) => ({ ...prev, teams }));
        setScreen("juego");
      }}
    />
  ) : screen === "juego" ? (
    <JuegoPage
      config={{
        teams: sessionInfo.teams,
        wordPool: WORD_POOLS_ES[sessionInfo.categoria?.slug] ?? [],
        boardLength: 12,
        turnDurationSeconds: 15,
      }}
      onExit={() => setScreen("landing")}
    />
  ) : null;
}

export default App;
