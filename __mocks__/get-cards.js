import { suits, values } from '../src/utils/constants';
import { createDeck } from '../src/utils/create-deck';

const deck = createDeck();
const getCard = (suit, value) =>
  deck.find(card => card.suit === suit && card.value === value);

export default {
  nineOfSpades: getCard(suits.SPADES, values.NINE),
  tenOfSpades: getCard(suits.SPADES, values.TEN),
  jackOfSpades: getCard(suits.SPADES, values.JACK),
  aceOfSpades: getCard(suits.SPADES, values.ACE),
  nineOfHearts: getCard(suits.HEARTS, values.NINE),
  kingOfHearts: getCard(suits.HEARTS, values.KING),
  aceOfHearts: getCard(suits.HEARTS, values.ACE),
  jackOfDiamonds: getCard(suits.DIAMONDS, values.JACK),
  jackOfHearts: getCard(suits.HEARTS, values.JACK),
  tenOfDiamonds: getCard(suits.DIAMONDS, values.TEN),
  kingOfDiamonds: getCard(suits.DIAMONDS, values.KING),
  aceOfDiamonds: getCard(suits.DIAMONDS, values.ACE),
  jackOfClubs: getCard(suits.CLUBS, values.JACK),
};
