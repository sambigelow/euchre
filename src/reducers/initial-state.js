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
    cards: [],
  },
  players: {
    [players.USER]: {
      id: players.USER,
      name: 'You',
      hand: [],
    },
    [players.PARTNER]: {
      id: players.PARTNER,
      name: 'Your Partner',
      hand: [],
    },
    [players.COMPUTER_ONE]: {
      id: players.COMPUTER_ONE,
      name: 'Carl',
      hand: [],
    },
    [players.COMPUTER_TWO]: {
      id: players.COMPUTER_TWO,
      name: 'Julie',
      hand: [],
    },
  },
};

export default initialState;
