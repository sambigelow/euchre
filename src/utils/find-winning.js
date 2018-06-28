import { createDeck } from './create-deck';
import { suits, values } from './constants';

const deck = createDeck();
const deckBySuit = Object.keys(suits).reduce((result, suit) => {
  const newSuit = suits[suit];
  result[newSuit] = deck.filter(card => card.suit === newSuit);
  return result;
}, {});

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
};

const findRightBower = trump => {
  const card = deckBySuit[trump].find(card => card.value === values.JACK);
  return card;
};
const findLeftBower = trump => {
  return deckBySuit[getLeftSuit(trump)].find(
    card => card.value === values.JACK,
  );
};

const getOrderedSuit = (suit, trump) => {
  if (suit === trump) {
    const minusJack = deckBySuit[suit].filter(card => card !== values.JACK);
    return [...minusJack, findLeftBower(trump), findRightBower(trump)];
  } else if (suit === getLeftSuit(trump)) {
    const minusJack = deckBySuit[suit].filter(card => card !== values.JACK);
    return minusJack;
  } else {
    return deckBySuit[suit];
  }
};

const getOrderedCards = trump => ({
  [suits.HEARTS]: getOrderedSuit(suits.HEARTS, trump),
  [suits.DIAMONDS]: getOrderedSuit(suits.DIAMONDS, trump),
  [suits.SPADES]: getOrderedSuit(suits.SPADES, trump),
  [suits.CLUBS]: getOrderedSuit(suits.CLUBS, trump),
});

const findWinning = (trump, trick) => {
  const orderedCards = getOrderedCards(trump);
  const leftSuit = getLeftSuit(trump);

  return trick.reduce((winner, currentCard, index) => {
    if (index === 0) {
      return { card: currentCard, index };
    }

    if (winner.card.suit === trump) {
      if (
        currentCard.suit === trump ||
        (currentCard.suit === leftSuit && currentCard.value === values.JACK)
      ) {
        const currentIndex = orderedCards[trump].findIndex(
          card =>
            card.value === currentCard.value && card.suit === currentCard.suit,
        );
        const winningIndex = orderedCards[trump].findIndex(
          card =>
            card.value === winner.card.value && card.suit === winner.card.suit,
        );

        return currentIndex > winningIndex
          ? { card: currentCard, index }
          : winner;
      } else {
        return winner;
      }
    }

    if (currentCard.suit === winner.card.suit) {
      const currentRanking = orderedCards[currentCard.suit].findIndex(
        card => card.value === currentCard.value,
      );
      const winningRanking = orderedCards[currentCard.suit].findIndex(card => {
        return card.value === winner.card.value;
      });

      return currentRanking > winningRanking
        ? { card: currentCard, index }
        : winner;
    }

    if (currentCard.suit === trump && winner.card.suit !== trump) {
      return { card: currentCard, index };
    }

    return winner;
  }, null);
};

export default findWinning;
