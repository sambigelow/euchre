import { createDeck } from '../utils/create-deck';

export const deal = () => {
  const deck = createDeck();

  return {
    type: 'DEAL',
    hands: [
      deck.slice(0, 5),
      deck.slice(5, 10),
      deck.slice(10, 15),
      deck.slice(15, 20),
    ],
    kitty: deck.slice(20),
  };
};
