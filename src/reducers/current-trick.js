import { firstPlayer } from '../utils/players';
import { actionTypes } from '../utils/constants';

export const initialCards = [{}, {}, {}, {}];

export const initialTrickState = {
  firstTurn: firstPlayer,
  winning: undefined,
  cards: initialCards,
};

const currentTrick = (
  state = initialTrickState,
  { type, playedCard, playedByIndex, winner },
) => {
  switch (type) {
    case actionTypes.PLAY_CARD:
      return {
        ...state,
        winning: winner.index,
        cards: [
          ...state.cards.slice(0, playedByIndex),
          playedCard,
          ...state.cards.slice(playedByIndex),
        ],
      };
    case actionTypes.PLAY_FOURTH_CARD:
      return {
        ...initialTrickState,
        firstTurn: winner.index,
      };
    default:
      return state;
  }
};

export default currentTrick;
