import { combineReducers } from 'redux';

import hands, * as fromHands from './hands';
import kitty, * as fromKitty from './kitty';
import tricks from './tricks';
import trump from './trump';
import turn, * as fromTurn from './turn';

export default combineReducers({
  hands,
  kitty,
  tricks,
  trump,
  turn,
});

export const getCurrentTurn = state  => fromTurn.getCurrentTurn(state.turn);
export const getHand = state => fromHands.getHand(state.hands);
export const getHands = state => fromHands.getHands(state.hands);
export const getKitty = state => fromKitty.getKitty(state.kitty);
