import { combineReducers } from 'redux';
import round from './round';
import game from './game';
import hands from './hands';
import tricksWon from './tricksWon';
import currentTrick from './currentTrick';

export default combineReducers({
  round,
  hands,
  tricksWon,
  currentTrick,
  game,
});
