import { useState } from "react";
import Landing from "./components/landing/Landing";
import CategoriasPage from "./components/categorias/CategoriasPage";

function App() {
  const [screen, setScreen] = useState("landing");
  const [sessionInfo, setSessionInfo] = useState({
    categoria: null,
    equipo: null,
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
    <h1>Equipos</h1>
  ) : null;
}

export default App;
