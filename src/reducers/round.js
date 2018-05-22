import { actionTypes, stages } from '../utils/constants';
import PLAYERS from '../utils/players';

export const initialRoundState = {
  dealer: 0,
  stage: stages.PRE_DEAL,
  passesCalled: 0,
  tricks: {
    userTeam: 0,
    opposingTeam: 0,
  },
  currentTurn: PLAYERS[0].nextTo,
  hands: [[], [], [], []],
};

const round = (
  state = initialRoundState,
  { type, cardToPickUp, hands, trump, cardToDiscard },
) => {
  switch (type) {
    case actionTypes.DEAL:
      return {
        ...state,
        stage: stages.CALLING_STRICT,
        hands,
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
        currentTurn: PLAYERS[state.currentTurn].nextTo,
        stage: newStage,
      };
    case actionTypes.PICK_IT_UP:
      return {
        ...state,
        trump: cardToPickUp.suit,
        stage: stages.DISCARDING,
        hands: [
          ...state.hands.slice(0, state.dealer),
          [...state.hands[state.dealer], cardToPickUp],
          ...state.hands.slice(state.dealer + 1),
        ],
        currentTurn: state.dealer,
      };
    case actionTypes.DISCARD:
      const indexToRemove = state.hands[state.dealer].indexOf(
        card => card === cardToDiscard,
      );
      return {
        ...state,
        stage: stages.PLAYING,
        hands: [
          ...state.hands.slice(0, state.dealer),
          [
            ...state.hands[state.dealer].slice(0, indexToRemove),
            state.hands[state.dealer].slice(indexToRemove + 1),
          ],
          ...state.hands.slice(state.dealer + 1),
        ],
        currentTurn: PLAYERS[state.dealer].nextTo,
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
