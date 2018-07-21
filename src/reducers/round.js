import { actionTypes, stages } from '../utils/constants';
import PLAYERS, { firstPlayer, firstDealer } from '../utils/players';

export const initialRoundState = {
  dealer: firstDealer,
  trump: null,
  stage: stages.PRE_DEAL,
  passesCalled: 0,
  currentTurn: firstPlayer,
};

const round = (
  state = initialRoundState,
  { type, cardToPickUp, trump, winner },
) => {
  switch (type) {
    case actionTypes.DEAL:
      return {
        ...state,
        stage: stages.CALLING_STRICT,
      };
    case actionTypes.PASS:
      const nextPassesCalled = state.passesCalled + 1;
      let newStage = state.stage;
      let nextTurn = PLAYERS[state.currentTurn].nextTo;

      if (nextPassesCalled >= 7) {
        newStage = stages.SCREWING_DEALER;
        nextTurn = state.dealer;
      } else if (nextPassesCalled > 3) {
        newStage = stages.CALLING_OPEN;
      }

      return {
        ...state,
        passesCalled: nextPassesCalled,
        currentTurn: nextTurn,
        stage: newStage,
      };
    case actionTypes.PICK_IT_UP:
      return {
        ...state,
        trump: cardToPickUp.suit,
        stage: stages.DISCARDING,
        currentTurn: state.dealer,
      };
    case actionTypes.DISCARD:
      return {
        ...state,
        stage: stages.PLAYING,
        currentTurn: PLAYERS[state.dealer].nextTo,
      };
    case actionTypes.CALL_TRUMP:
      return {
        ...state,
        trump,
        currentTurn: PLAYERS[state.dealer].nextTo,
        stage: stages.PLAYING,
      };
    case actionTypes.PLAY_CARD:
      return {
        ...state,
        currentTurn: PLAYERS[state.currentTurn].nextTo,
      };
    case actionTypes.PLAY_FOURTH_CARD:
      return {
        ...state,
        currentTurn: winner.index,
      };
    case actionTypes.ROUND_OVER:
      return {
        dealer: PLAYERS[dealer].nextTo,
        stage: stages.PRE_DEAL,
        passesCalled: 0,
        currentTurn: PLAYERS[PLAYERS[dealer].nextTo].nextTo,
      };
    default:
      return state;
  }
};

export default round;
