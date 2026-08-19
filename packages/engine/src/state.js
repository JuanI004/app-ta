export function createInitialState({
  teams,
  wordPool,
  boardLength = 30,
  turnDurationSeconds = 60,
  wordsPerTurn = 6,
}) {
  return {
    phase: "idle",
    config: {
      boardLength,
      turnDurationSeconds,
      wordsPerTurn,
    },
    wordPool: wordPool.map((text, index) => ({ id: index, text })),
    usedWords: [],
    teams: teams.map((team, index) => ({
      id: index + 1,
      name: team.name,
      players: team.players,
      descriptorIndex: 0,
      position: 0,
    })),
    turnNumber: 0,
    currentTeamIndex: 0,
    turn: null,
    lastDiceResult: null,
    winnerTeamId: null,
  };
}
