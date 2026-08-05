import { useState } from "react";
import Landing from "./components/landing/Landing";

function App() {
  const [screen, setScreen] = useState("landing");
  return screen === "landing" && <Landing />;
}

export default App;
