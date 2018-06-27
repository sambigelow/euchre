import createDeck from './create-deck';
import { suits, values } from './constants';

const getLeftSuit = trump => {
  switch (trump) {
    case suits.CLUBS:
      return suits.SPADES;
    case suits.SPADES:
      return suits.CLUBS;
    case suits.DIAMONDS:
      return suits.HEARTS;
    case suits.HEARTS:
      return suits.DIAMONDS;
    default:
      throw new Error('UNKNOWN SUIT');
  }
}
const deck = createDeck();
const deckBySuit = Object.keys(suits).reduce((suit, result) => {
  result[suit] = deck.filter(card => card.suit === suit);
});

const findRightBower = trump => deck.find(card => card.value === values.JACK && card.suit === suits[trump]);
const findLeftBower = trump => {
  const leftSuit = getLeftSuit(trump);
  return deck.find(card => card.suit === suits[leftSuit] && card.value === values.JACK);
};

const getOrderedSuit = (suit, trump) => {
  if (suit === trump) {
    const minusJack = deckBySuit[suit].filter(card => card !== values.JACK);
    return [...minusJack, findLeftBower(trump), findRightBower(trump)]
  } else if (suit === getLeftSuit(trump)) {
    const minusJack = deckBySuit[suit].filter(card => card !== values.JACK);
    return minusJack;
  } else {
    return deckBySuit[suit];
  }
}

const getOrderedCards = trump => ({
  [suits.HEARTS]: getOrderedSuit(suits.HEARTS, trump),
  [suits.DIAMONDS]: getOrderedSuit(suits.DIAMONDS, trump),
  [suits.SPADES]: getOrderedSuit(suits.SPADES, trump),
  [suits.CLUBS]: getOrderedSuit(suits.CLUBS, trump),
});

const findWinning = (trump, trick) => {
  const orderedCards = getOrderedCards(trump);

  trick.reduce((currentCard, winningCard, i) => {
    if (i === 0) {
      return currentCard;
    }

    if (currentCard.suit === winningCard.suit) {
      if (orderedCards[currentCard.suit].findIndex(card => card.value === currentCard.value) >
          orderedCards[currentCard.suit].findIndex(card => card.value === winningCard.value)) {
        return currentCard;
      } else {
        return winningCard;
      }
    }
    
    if (currentCard.suit === trump && winningCard.suit !== trump) {
      return currentCard;
    }

    return winningCard;
  });
};

export default findWinning;
