import findWinning from './find-winning';
import { suits, values } from './constants';
import cards from '../../__mocks__/get-cards';

const {
  nineOfSpades,
  tenOfSpades,
  jackOfSpades,
  aceOfSpades,
  nineOfHearts,
  kingOfHearts,
  aceOfHearts,
  jackOfDiamonds,
  jackOfHearts,
  tenOfDiamonds,
  kingOfDiamonds,
  aceOfDiamonds,
  jackOfClubs,
} = cards;

describe('findWinning', () => {
  const trump = suits.HEARTS;

  it('returns the higher card of non trump cards', () => {
    const winning = findWinning(
      trump,
      [nineOfSpades, tenOfSpades, aceOfSpades, jackOfSpades],
      0,
    );

    expect(winning.index).toBe(2);
    expect(winning.card.value).toBe(values.ACE);
    expect(winning.card.suit).toBe(suits.SPADES);
  });

  // TODO: this is not working right now
  it('considers left bower to be higher than ace of trump', () => {
    const winner = findWinning(
      trump,
      [nineOfHearts, aceOfHearts, jackOfSpades, jackOfDiamonds],
      0,
    );

    expect(winner.index).toBe(3);
    expect(winner.card.suit).toBe(suits.DIAMONDS);
  });

  it('trump beats non trump', () => {
    const winner = findWinning(
      trump,
      [aceOfDiamonds, tenOfDiamonds, nineOfHearts, kingOfDiamonds],
      0,
    );

    expect(winner.index).toBe(2);
    expect(winner.card.suit).toBe(suits.HEARTS);
    expect(winner.card.value).toBe(values.NINE);
  });

  it('right bower is highest trump card', () => {
    const winner = findWinning(
      trump,
      [jackOfHearts, jackOfDiamonds, aceOfHearts, kingOfHearts],
      0,
    );

    expect(winner.index).toBe(0);
    expect(winner.card.suit).toBe(suits.HEARTS);
    expect(winner.card.value).toBe(values.JACK);
  });

  it('returns first card played if none of the others are trump or follow suit', () => {
    const winner = findWinning(
      trump,
      [nineOfSpades, aceOfDiamonds, jackOfClubs, tenOfDiamonds],
      0,
    );

    expect(winner.index).toBe(0);
    expect(winner.card.suit).toBe(suits.SPADES);
    expect(winner.card.value).toBe(values.NINE);
  });

  it('returns index of currently winning even if trick is not complete', () => {
    const winning = findWinning(trump, [nineOfSpades], 0);

    expect(winning.index).toBe(0);
    expect(winning.card.suit).toBe(suits.SPADES);
    expect(winning.card.value).toBe(values.NINE);
  });
});
