import { deal } from './deal';

describe('deal', () => {
  it('creates four hands', () => {
    expect(deal().dealtHands).toHaveLength(4);
  });

  it('creates each hand with 5 cards', () => {
    deal().dealtHands.forEach(hand => {
      expect(hand).toHaveLength(5);
    });
  });

  it('creates a kitty with four cards', () => {
    expect(deal().dealtKitty).toHaveLength(4);
  });
});
