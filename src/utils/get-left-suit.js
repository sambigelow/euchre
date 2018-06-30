import { suits } from './constants';

const getLeftSuit = trump => {
  console.log(trump);
  switch (trump) {
    case suits.CLUBS:
      return suits.SPADES;
    case suits.SPADES:
      return suits.CLUBS;
    case suits.DIAMONDS:
      return suits.HEARTS;
    case suits.HEARTS:
      return suits.DIAMONDS;
    default:
      throw new Error('UNKNOWN SUIT');
  }
};

export default getLeftSuit;