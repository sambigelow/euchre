export const playerNames = {
  USER: 'user',
  COMPUTER_ONE: 'computer_one',
  PARTNER: 'partner',
  COMPUTER_TWO: 'computer_two',
};

const PLAYERS = [
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
    name: 'Computer One',
  },
  {
    id: playerNames.PARTNER,
    hand: 2,
    nextTo: 3,
    name: 'Your Partner',
  },
  {
    id: playerNames.COMPUTER_TWO,
    hand: 3,
    nextTo: 0,
    name: 'Computer Two',
  },
];

export const firstPlayer = PLAYERS[0].nextTo;
export const firstDealer = 0;

export default PLAYERS;
