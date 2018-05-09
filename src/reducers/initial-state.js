import { initialPlayersState } from './players';
import { initialRoundState } from './round';
import { initialGameState } from './game';
import { initialKittyState } from './kitty';

const initialState = {
  game: initialGameState,
  round: initialRoundState,
  kitty: initialKittyState,
  players: initialPlayersState,
};

export default initialState;
