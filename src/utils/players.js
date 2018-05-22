export const playerNames = {
  USER: 'user',
  COMPUTER_ONE: 'computer_one',
  PARTNER: 'partner',
  COMPUTER_TWO: 'computer_two',
};

const players = [
  {
    id: playerNames.USER,
    hand: 0,
    nextTo: 1,
    name: 'You',
  },
  {
    id: playerNames.COMPUTER_ONE,
    hand: 1,
    nextTo: 2,
    name: 'Your Partner',
  },
  {
    id: playerNames.PARTNER,
    hand: 2,
    nextTo: 3,
    name: 'Carl',
  },
  {
    id: playerNames.COMPUTER_TWO,
    hand: 3,
    nextTo: 0,
    name: 'Julie',
  },
];

export default players;
