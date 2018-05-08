import { actionTypes, suits } from '../utils/constants';

const callTrump = suit => () => ({
  type: actionTypes.CALL_TRUMP,
  suit
});

export const callHearts = callTrump(suits.HEARTS);
export const callDiamonds = callTrump(suits.DIAMONDS);
export const callSpades = callTrump(suits.SPADES);
export const callClubs = callTrump(suits.CLUBS);

export const pickItUp = card => ({
  type: actionTypes.PICK_IT_UP,
  card
});