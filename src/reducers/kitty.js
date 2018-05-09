import { actionTypes } from '../utils/constants';

export const initialKittyState = {
  flipped: false,
  cards: [],
};

const kitty = (
  state = initialKittyState,
  { type, cardsInKitty, flipKitty },
) => {
  switch (type) {
    case actionTypes.DEAL:
      return {
        ...state,
        cards: cardsInKitty,
      };
    case actionTypes.PASS:
      return {
        ...state,
        flipped: flipKitty,
      };
    case actionTypes.PICK_IT_UP:
      return {
        ...state,
        cards: state.cards.slice(1),
      };
    default:
      return state;
  }
};

export default kitty;
