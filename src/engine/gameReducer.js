import {
  markWord,
  tick,
  reviewUpdateWord,
  confirmReview,
  rollDice,
  ackDiceResult,
} from "./reducer";

export function gameReducer(state, action) {
  switch (action.type) {
    case "MARK_WORD":
      return markWord(state, action.wordId, action.status);
    case "TICK":
      return tick(state);
    case "REVIEW_UPDATE_WORD":
      return reviewUpdateWord(state, action.wordId, action.status);
    case "CONFIRM_REVIEW":
      return confirmReview(state);
    case "ROLL_DICE":
      return rollDice(state);
    case "ACK_DICE_RESULT":
      return ackDiceResult(state);
    default:
      return state;
  }
}
