import { players, stages } from '../utils/constants';

const defaultPlayerState = {
  hand: [],
};

const initialState = {
  game: {
    points: {
      userTeam: 0,
      opposingTeam: 0,
    },
  },
  round: {
    dealer: players.USER,
    stage: stages.PRE_DEAL,
    tricks: {
      userTeam: 0,
      opposingTeam: 0,
    },
    currentTurn: 0,
    sequence: [
      players.COMPUTER_ONE,
      players.PARTNER,
      players.COMPUTER_TWO,
      players.USER,
    ],
  },
  kitty: {
    flipped: false,
    cards: []
  },
  players: {
    [players.USER]: defaultPlayerState,
    [players.PARTNER]: defaultPlayerState,
    [players.COMPUTER_ONE]: defaultPlayerState,
    [players.COMPUTER_TWO]: defaultPlayerState,
  },
};

export default initialState;
