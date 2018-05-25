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
  kitty: [],
};

const round = (
  state = initialRoundState,
  { type, cardToPickUp, dealtHands, dealtKitty, trump, cardToDiscard },
) => {
  switch (type) {
    case actionTypes.DEAL:
      const result = {
        ...state,
        stage: stages.CALLING_STRICT,
        hands: dealtHands,
        kitty: dealtKitty,
      };
      return result;
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
        kitty: state.kitty.slice(1),
      };
    case actionTypes.DISCARD:
      const { hands, dealer } = state;
      const indexToRemove = hands[state.dealer].indexOf(cardToDiscard);
      const dealerHand = [
        ...hands[dealer].slice(0, indexToRemove),
        ...hands[dealer].slice(indexToRemove + 1),
      ];

      // console.log({ oldHand: state.hands[dealer], dealerHand, indexToRemove });

      return {
        ...state,
        stage: stages.PLAYING,
        hands: [
          ...hands.slice(0, dealer),
          dealerHand,
          ...hands.slice(dealer + 1),
        ],
        kitty: [cardToDiscard, ...state.kitty],
        currentTurn: PLAYERS[dealer].nextTo,
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
