import { suits as suitConstants, values as valueConstants } from './constants';

const suits = Object.keys(suitConstants).map(suit => suitConstants[suit]);
const values = Object.keys(valueConstants).map(value => valueConstants[value]);

export const createDeck = () =>
  suits.reduce((currentDeck, suit) => {
    const color = suit === 'spades' || suit === 'clubs' ? 'black' : 'red';
    const newCards = values.map(value => ({
      value,
      suit,
      color,
      description: `${value} of ${suit}`,
    }));

    return [...currentDeck, ...newCards];
  }, []);
