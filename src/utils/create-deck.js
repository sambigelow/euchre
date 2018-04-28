import { SUITS, VALUES } from './constants';

const suits = Object.keys(SUITS).map(suit => SUITS[suit]);
const values = Object.keys(VALUES).map(value => VALUES[value]);

export const deck = suits.reduce((currentDeck, suit) => {
  const color = suit === 'spades' || suit === 'clubs' ? 'black' : 'red';
  const newCards = values.map(value => ({
    value,
    suit,
    color,
    description: `${value} of ${suit}`
  }));

  return [...currentDeck, ...newCards];
}, []);
