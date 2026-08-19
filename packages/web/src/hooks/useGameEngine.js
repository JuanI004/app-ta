import { useReducer } from "react";
import { createInitialState } from "../engine/state";
import { startTurn } from "../engine/reducer";
import { gameReducer } from "../engine/gameReducer";

function init(config) {
  return startTurn(createInitialState(config));
}

export function useGameEngine(config) {
  const [state, dispatch] = useReducer(gameReducer, config, init);

  return { state, dispatch };
}
