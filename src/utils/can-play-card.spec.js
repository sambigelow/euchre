import canPlayCard from './can-play-card';
import cards from '../../__mocks__/get-cards';

const {
  nineOfSpades,
  tenOfSpades,
  jackOfSpades,
  nineOfHearts,
} = cards;

describe('canPlayCard', () => {
  it('returns true if card and leadingcard are same suit', () => {
    expect(
      canPlayCard(nineOfSpades, [nineOfSpades, jackOfSpades], tenOfSpades),
    ).toBe(true);
  });

  it("returns false if played card doesn't follow suit and hand has suit", () => {
    expect(
      canPlayCard(nineOfHearts, [nineOfSpades, nineOfHearts], tenOfSpades),
    ).toBe(false);
  });
});
