import { useReducer } from "react";
import { createInitialState } from "../../../engine/src/state";
import { startTurn } from "../../../engine/src/reducer";
import { gameReducer } from "../../../engine/src/gameReducer";

function init(config) {
  return startTurn(createInitialState(config));
}

export function useGameEngine(config) {
  const [state, dispatch] = useReducer(gameReducer, config, init);

  return { state, dispatch };
}
