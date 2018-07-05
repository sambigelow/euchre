import { actionTypes } from '../utils/constants';

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
    cardToDiscard,
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
        ...state.slice(dealer + 1),
      ];
    case actionTypes.DISCARD:
      const indexToRemove = state[dealer].cards.indexOf(cardToDiscard);
      return [
        ...state.slice(0, dealer),
        {
          ...state[dealer],
          cards: [
            ...state[dealer].cards.slice(0, indexToRemove),
            ...state[dealer].cards.slice(indexToRemove + 1),
          ],
        },
        ...state.slice(dealer + 1),
      ];
    case actionTypes.CANT_PLAY_CARD:
      return [
        ...state.slice(0, playedByIndex),
        {
          error: `Can't play that card!`,
          cards: state[playedByIndex].cards,
        },
        ...state.slice(playedByIndex + 1),
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
        ...state.slice(playedByIndex + 1),
      ];
    case actionTypes.ROUND_OVER:
      return initialHandsState;
    default:
      return state;
  }
};

export default hands;
