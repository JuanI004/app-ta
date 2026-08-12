import { drawWords } from "./wordPool";
import { pickRandomIndex } from "./rng";

function setWordStatus(words, wordId, status) {
  return words.map((word) => (word.id === wordId ? { ...word, status } : word));
}

function updateTeam(teams, teamId, changes) {
  return teams.map((team) =>
    team.id === teamId ? { ...team, ...changes } : team,
  );
}

export function startTurn(state, random = Math.random) {
  const team = state.teams[state.currentTeamIndex];
  const { drawn, remaining } = drawWords(
    state.wordPool,
    state.config.wordsPerTurn,
    random,
  );

  const words = drawn.map((word) => ({ ...word, status: "pendiente" }));

  return {
    ...state,
    phase: "turnActive",
    wordPool: remaining,
    usedWords: [...state.usedWords, ...drawn],
    turn: {
      teamId: team.id,
      descriptorPlayerName: team.players[team.descriptorIndex],
      words,
      timeRemaining: state.config.turnDurationSeconds,
    },
  };
}

export function endTurn(state) {
  if (state.phase !== "turnActive") {
    return state;
  }

  return {
    ...state,
    phase: "turnReview",
  };
}

export function tick(state) {
  if (state.phase !== "turnActive") {
    return state;
  }

  const timeRemaining = Math.max(0, state.turn.timeRemaining - 1);

  const nextState = {
    ...state,
    turn: {
      ...state.turn,
      timeRemaining,
    },
  };

  if (timeRemaining === 0) {
    return endTurn(nextState);
  }

  return nextState;
}

export function markWord(state, wordId, status) {
  if (state.phase !== "turnActive") {
    return state;
  }

  const nuevasWords = setWordStatus(state.turn.words, wordId, status);

  const nextState = {
    ...state,
    turn: {
      ...state.turn,
      words: nuevasWords,
    },
  };

  const quedanPendientes = nuevasWords.some(
    (word) => word.status === "pendiente",
  );

  if (!quedanPendientes) {
    return endTurn(nextState);
  }

  return nextState;
}

export function reviewUpdateWord(state, wordId, status) {
  if (state.phase !== "turnReview") {
    return state;
  }

  const nuevasWords = setWordStatus(state.turn.words, wordId, status);

  return {
    ...state,
    turn: {
      ...state.turn,
      words: nuevasWords,
    },
  };
}

export function confirmReview(state) {
  if (state.phase !== "turnReview") {
    return state;
  }

  return {
    ...state,
    phase: "diceRoll",
  };
}

export function rollDice(state, random = Math.random) {
  if (state.phase !== "diceRoll") {
    return state;
  }

  const value = pickRandomIndex(3, random);
  const team = state.teams[state.currentTeamIndex];
  const correctCount = state.turn.words.filter(
    (word) => word.status === "acertada",
  ).length;
  const delta = correctCount - value;

  const previousPosition = team.position;
  const newPosition = Math.max(
    0,
    Math.min(state.config.boardLength, previousPosition + delta),
  );

  const nuevosTeams = updateTeam(state.teams, team.id, {
    position: newPosition,
  });

  const winnerTeamId = newPosition >= state.config.boardLength ? team.id : null;

  return {
    ...state,
    teams: nuevosTeams,
    winnerTeamId,
    lastDiceResult: {
      teamId: team.id,
      value,
      correctCount,
      delta,
      previousPosition,
      newPosition,
    },
  };
}

export function ackDiceResult(state, random = Math.random) {
  if (state.phase !== "diceRoll") {
    return state;
  }

  if (state.winnerTeamId) {
    return {
      ...state,
      phase: "gameOver",
    };
  }

  const playedTeam = state.teams[state.currentTeamIndex];
  const nuevosTeams = updateTeam(state.teams, playedTeam.id, {
    descriptorIndex:
      (playedTeam.descriptorIndex + 1) % playedTeam.players.length,
  });

  const nextTeamIndex = (state.currentTeamIndex + 1) % state.teams.length;

  const nextState = {
    ...state,
    teams: nuevosTeams,
    currentTeamIndex: nextTeamIndex,
    lastDiceResult: null,
  };

  return startTurn(nextState, random);
}
