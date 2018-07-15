import getLeftSuit from './get-left-suit';
import { values } from './constants';

const getEffectiveSuit = (card, trump) => {
  const leftSuit = getLeftSuit(trump);
  return card.suit === leftSuit && card.value === values.JACK
    ? trump
    : card.suit;
};

const canPlayCard = (card, hand, leadingCard, trump) => {
  const effectiveCardSuit = getEffectiveSuit(card, trump);
  const effectiveLeadingSuit = getEffectiveSuit(leadingCard, trump);

  if (effectiveCardSuit === effectiveLeadingSuit) {
    return true;
  } else if (
    hand.find(card => getEffectiveSuit(card, trump) === effectiveLeadingSuit)
  ) {
    console.error('has card of same suit');
    return false;
  } else {
    return true;
  }
};

export default canPlayCard;
