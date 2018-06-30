import PLAYERS, { firstPlayer } from '../utils/players';
import { actionTypes } from '../utils/constants';

export const initialTrickState = {
  firstTurn: firstPlayer,
  winning: undefined,
  cards: [{}, {}, {}, {}],
};

const currentTrick = (
  state = initialTrickState,
  { type, trump, playedCard, playedByIndex, winning, isFinalCard },
) => {
  switch (type) {
    case actionTypes.PLAY_CARD:
      const isFinalCard = state.cards.filter(card => card.suit).length === 3;
      const nextCards = [
        ...state.cards.slice(0, playedByIndex),
        playedCard,
        ...state.cards.slice(playedByIndex)
      ];
      
  }
};
