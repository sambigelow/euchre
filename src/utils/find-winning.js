import { createDeck } from './create-deck';
import { suits, values } from './constants';
import getLeftSuit from './get-left-suit';

const deck = createDeck();
const deckBySuit = Object.keys(suits).reduce((result, suit) => {
  const newSuit = suits[suit];
  result[newSuit] = deck.filter(card => card.suit === newSuit);
  return result;
}, {});

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
    const minusJack = deckBySuit[suit].filter(
      card => card.value !== values.JACK,
    );
    return [...minusJack, findLeftBower(trump), findRightBower(trump)];
  } else if (suit === getLeftSuit(trump)) {
    const minusJack = deckBySuit[suit].filter(
      card => card.value !== values.JACK,
    );
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

const findWinning = (trump, cards, firstTurn) => {
  const trickReordered = [
    ...cards.slice(firstTurn),
    ...cards.slice(0, firstTurn),
  ];

  const indexMap = [
    firstTurn,
    (firstTurn + 1) % 4,
    (firstTurn + 2) % 4,
    (firstTurn + 3) % 4,
  ];

  
  const orderedCards = getOrderedCards(trump);
  const leftSuit = getLeftSuit(trump);

  const winning = trickReordered.reduce((winner, currentCard, index) => {
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
      console.log({ orderedCards, currentCard });
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

  winning.index = indexMap[winning.index];
  return winning;
};

export default findWinning;
