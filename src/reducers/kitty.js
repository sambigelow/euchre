import { actionTypes } from '../utils/constants';

const initialKittyState = [];

const kitty = (state = initialKittyState, {
  type, dealtKitty, cardToDiscard
}) => {
  switch (type) {
    case actionTypes.DEAL:
      return dealtKitty;
    case actionTypes.PICK_IT_UP:
      return state.slice(1);
    case actionTypes.DISCARD:
      return [cardToDiscard, ...state];
    case actionTypes.ROUND_OVER:
      return initialKittyState;
    default:
      return state;
  }
}

export default kitty;