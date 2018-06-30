import { actionTypes, suits } from '../utils/constants';

export const callTrump = trump => () => ({
  type: actionTypes.CALL_TRUMP,
  trump,
});

export const callHearts = callTrump(suits.HEARTS);
export const callDiamonds = callTrump(suits.DIAMONDS);
export const callSpades = callTrump(suits.SPADES);
export const callClubs = callTrump(suits.CLUBS);

export const pickItUp = (cardToPickUp, dealer) => ({
  type: actionTypes.PICK_IT_UP,
  cardToPickUp,
  dealer,
});

export const pass = () => ({
  type: actionTypes.PASS,
});

export const discard = cardToDiscard => (dispatch, getState) => {
  const {
    round: { dealer },
  } = getState();

  dispatch({
    type: actionTypes.DISCARD,
    cardToDiscard,
    dealer,
  });
};
