import { actionTypes, stages, teams } from '../utils/constants';
import PLAYERS from '../utils/players';
import canPlayCard from '../utils/can-play-card';

const initialHand = {
  error: null,
  cards: [],
};

export const initialHandsState = new Array(4).fill(initialHand);

const hands = (
  state = initialHandsState,
  {
    type,
    dealtHands,
    dealer,
    cardToPickUp,
    indexToRemove,
    trump,
    cardToDiscard,
    currentTrick,
    playedCard,
    playedByIndex,
  },
) => {
  switch (type) {
    case actionTypes.DEAL:
      return dealtHands.map(hand => ({
        error: null,
        cards: hand,
      }));
    case actionTypes.PICK_IT_UP:
      return [
        ...state.slice(0, dealer),
        {
          ...state[dealer],
          cards: [...state[dealer].cards, cardToPickUp],
        },
        ...state.slice(dealer),
      ];
    case actionTypes.DISCARD:
      return [
        ...state.slice(0, dealer),
        {
          ...state[dealer],
          cards: [
            ...state[dealer].cards.slice(0, indexToRemove),
            ...state[dealer].cards.slice(indexToRemove),
          ],
        },
        ...state.slice(dealer),
      ];
    case actionTypes.CANT_PLAY_CARD:
      return [
        ...state.slice(0, playedByIndex),
        {
          error: `Can't play that card!`,
          cards: state[playedByIndex].cards,
        },
        ...state.slice(playedByIndex),
      ];
    case actionTypes.PLAY_CARD:
      const playedCardIndex = state[playedByIndex].cards.indexOf(playedCard);

      return [
        ...state.slice(0, playedByIndex),
        {
          error: null,
          cards: [
            ...state[playedByIndex].cards.slice(0, playedCardIndex),
            ...state[playedByIndex].cards.slice(playedCardIndex + 1),
          ],
        },
        ...state.slice(playedByIndex),
      ];
    default:
      return state;
  }
};

export default hands;
