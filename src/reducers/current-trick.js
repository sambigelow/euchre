import { firstPlayer } from '../utils/players';
import { actionTypes } from '../utils/constants';

const initialCards = [{}, {}, {}, {}];

export const initialTrickState = {
  firstTurn: firstPlayer,
  winning: undefined,
  cards: initialCards,
};

const currentTrick = (
  state = initialTrickState,
  { type, playedCard, playedByIndex },
) => {
  switch (type) {
    case actionTypes.PLAY_CARD:
      return [
        ...state.cards.slice(0, playedByIndex),
        playedCard,
        ...state.cards.slice(playedByIndex),
      ];
    case actionTypes.PLAY_FOURTH_CARD:
      return initialCards;
  }
};

export default currentTrick;
