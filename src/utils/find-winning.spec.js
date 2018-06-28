import findWinning from './find-winning';
import { suits, values } from './constants';
import { createDeck } from './create-deck';

describe('findWinning', () => {
  const deck = createDeck();
  const getCard = (suit, value) =>
    deck.find(card => card.suit === suit && card.value === value);

  const trump = suits.HEARTS;

  it('returns the higher card of non trump cards', () => {
    const nineOfSpades = getCard(suits.SPADES, values.NINE);
    const tenOfSpades = getCard(suits.SPADES, values.TEN);
    const jackOfSpades = getCard(suits.SPADES, values.JACK);
    const aceOfSpades = getCard(suits.SPADES, values.ACE);

    const winning = findWinning(trump, [
      nineOfSpades,
      tenOfSpades,
      aceOfSpades,
      jackOfSpades,
    ]);

    expect(winning.index).toBe(2);
    expect(winning.card.value).toBe(values.ACE);
    expect(winning.card.suit).toBe(suits.SPADES);
  });

  // TODO: this is not working right now
  it('considers left bower to be higher than ace of trump', () => {
    const nineOfHearts = getCard(suits.HEARTS, values.NINE);
    const aceOfHearts = getCard(suits.HEARTS, values.ACE);
    const jackOfSpades = getCard(suits.SPADES, values.JACK);
    const jackOfDiamonds = getCard(suits.DIAMONDS, values.JACK);

    const winner = findWinning(trump, [
      nineOfHearts,
      aceOfHearts,
      jackOfSpades,
      jackOfDiamonds,
    ]);

    expect(winner.index).toBe(3);
    expect(winner.card.suit).toBe(suits.DIAMONDS);
  });

  it('trump beats non trump', () => {});

  it('right bower is highest trump card', () => {});

  it('returns first card played if none of the others are trump or follow suit', () => {
    const nineOfSpades = getCard(suits.SPADES, values.NINE);
    const aceOfDiamonds = getCard(suits.DIAMONDS, values.ACE);
    const jackOfClubs = getCard(suits.CLUBS, values.JACK);
    const tenOfDiamonds = getCard(suits.DIAMONDS, values.TEN);

    const winner = findWinning(trump, [
      nineOfSpades,
      aceOfDiamonds,
      jackOfClubs,
      tenOfDiamonds,
    ]);

    expect(winner.index).toBe(0);
    expect(winner.card.suit).toBe(suits.SPADES);
    expect(winner.card.value).toBe(values.NINE);
  });
});
