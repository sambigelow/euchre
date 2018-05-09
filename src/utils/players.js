export const playerNames = {
  USER: 'user',
  COMPUTER_ONE: 'computer_one',
  PARTNER: 'partner',
  COMPUTER_TWO: 'computer_two',
};

const players = {
  [playerNames.USER]: {
    id: playerNames.USER,
    nextTo: playerNames.COMPUTER_ONE,
    name: 'You',
  },
  [playerNames.COMPUTER_ONE]: {
    id: playerNames.COMPUTER_ONE,
    nextTo: playerNames.PARTNER,
    name: 'Your Partner',
  },
  [playerNames.PARTNER]: {
    id: playerNames.PARTNER,
    nextTo: playerNames.COMPUTER_TWO,
    name: 'Carl',
  },
  [playerNames.COMPUTER_TWO]: {
    id: playerNames.COMPUTER_TWO,
    nextTo: playerNames.COMPUTER_ONE,
    name: 'Julie',
  },
};

export default players;