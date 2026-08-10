import { useState } from "react";
import Landing from "./components/landing/Landing";

function App() {
  const [screen, setScreen] = useState("landing");
  return screen === "landing" ? (
    <Landing onJugar={() => setScreen("categorias")} />
  ) : (
    screen === "categorias" && <div>Categorias</div>
  );
}

export default App;
