import { actionTypes, suits } from '../utils/constants';

const callTrump = trump => () => ({
  type: actionTypes.CALL_TRUMP,
  trump,
});

export const callHearts = callTrump(suits.HEARTS);
export const callDiamonds = callTrump(suits.DIAMONDS);
export const callSpades = callTrump(suits.SPADES);
export const callClubs = callTrump(suits.CLUBS);

export const pickItUp = cardToPickUp => ({
  type: actionTypes.PICK_IT_UP,
  cardToPickUp,
});

export const pass = () => ({
  type: actionTypes.PASS,
});

export const discard = cardToDiscard => ({
  type: actionTypes.DISCARD,
  cardToDiscard,
});
