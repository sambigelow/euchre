import { combineReducers } from 'redux';
import round from './round';
import game from './game';

export default combineReducers({
  round,
  game,
});
