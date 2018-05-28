import { createDeck } from './create-deck';
import { suits, values } from './constants';

describe('createDeck', () => {
  const deck = createDeck();

  it('creates proper amount of cards', () => {
    expect(deck).toHaveLength(24);
  });

  it('creates only one of each card', () => {
    Object.keys(suits).forEach(suit => {
      Object.keys(values).forEach(value => {
        const card = deck.filter(
          card => card.suit === suits[suit] && card.value === values[value],
        );

        expect(card).toHaveLength(1);
      });
    });
  });
});
