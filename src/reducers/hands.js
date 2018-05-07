import { callingOptions } from './turn';

const initialState = [[], [], [], []];

const hands = (state = initialState, { type, hands, topOfKitty }) => {
  switch (type) {
    case 'DEAL':
      return [...hands];
    case callingOptions.PICK_IT_UP:
      return [...hands.slice(0, 3), [...hands[3], topOfKitty]];
    default:
      return state;
  }
};

export default hands;

export const getHand = (state, player) => state[player];
export const getHands = state => state;
