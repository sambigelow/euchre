import { actionTypes } from '../utils/constants';

export const playCard = (playedCard, playedByIndex) => ({
  type: actionTypes.PLAY_CARD,
  playedCard,
  playedByIndex,
});
