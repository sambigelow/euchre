import { actionTypes, stages } from '../utils/constants';
import players from '../utils/players';

export const initialRoundState = {
  dealer: players.USER,
  stage: stages.PRE_DEAL,
  passesCalled: 0,
  tricks: {
    userTeam: 0,
    opposingTeam: 0,
  },
  currentTurn: players.USER,
};

const round = (state = initialRoundState, { type, card, trump }) => {
  switch (type) {
    case actionTypes.DEAL:
      return {
        ...state,
        stage: stages.CALLING_STRICT,
      };
    case actionTypes.PASS:
      const nextPassesCalled = state.passesCalled + 1;
      let newStage = state.stage;

      if (nextPassesCalled >= 7) {
        newStage = stages.SCREWING_DEALER;
      } else if (nextPassesCalled > 3) {
        newStage = stages.CALLING_OPEN;
      }
      return {
        ...state,
        passesCalled: nextPassesCalled,
        currentTurn: players[state.currentTurn].nextTo,
        stage: newStage,
      };
    case actionTypes.PICK_IT_UP:
      return {
        ...state,
        trump: card.suit,
        stage: stages.DISCARDING,
      };
    case actionTypes.DISCARD:
      return {
        ...state,
        stage: stages.PLAYING,
      };
    case actionTypes.CALL_TRUMP:
      return {
        ...state,
        trump,
      };
    default:
      return state;
  }
};

export default round;
