import { combineReducers } from 'redux';
import round from './round';
import game from './game';
import hands from './hands';
import kitty from './kitty';
import tricksWon from './tricks-won';
import currentTrick from './current-trick';

export default combineReducers({
  round,
  hands,
  kitty,
  currentTrick,
  tricksWon,
  game,
});
