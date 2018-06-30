import getLeftSuit from './get-left-suit';
import { values } from './constants';

const canPlayCard = (card, hand, leadingCard, trump) => {
  const leftSuit = getLeftSuit(trump);
  const effectiveCardSuit =
    card.suit === leftSuit && card.value === values.JACK ? trump : card.suit;
  const effectiveLeadingSuit =
    leadingCard.suit === leftSuit && leadingCard.value === values.JACK
      ? trump
      : leadingCard.suit;

  if (effectiveCardSuit === effectiveLeadingSuit) {
    return true;
  } else if (hand.find(card => card.suit === leadingCard.suit)) {
    console.error('has card of same suit');
    return false;
  } else {
    return true;
  }
};

export default canPlayCard;
