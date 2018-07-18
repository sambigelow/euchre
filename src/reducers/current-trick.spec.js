import currentTrick, { initialTrickState, initialCards } from './current-trick';
import PLAYERS, { firstPlayer } from '../utils/players';
import { actionTypes } from '../utils/constants';
import deck from '../../__mocks__/deck';

describe('currentTrick reducer', () => {
  const secondPlayer = PLAYERS[firstPlayer].nextTo;
  const thirdPlayer = PLAYERS[secondPlayer].nextTo;
  const fourthPlayer = PLAYERS[thirdPlayer].nextTo;

  const firstCard = deck[0];
  const secondCard = deck[2];
  const thirdCard = deck[1];
  const firstPlayedState = currentTrick(initialTrickState, {
    type: actionTypes.PLAY_CARD,
    playedCard: firstCard,
    playedByIndex: firstPlayer,
    winning: { card: firstCard, index: firstPlayer },
  });

  const secondPlayedState = currentTrick(firstPlayedState, {
    type: actionTypes.PLAY_CARD,
    playedCard: secondCard,
    playedByIndex: PLAYERS[firstPlayer].nextTo,
    winning: { card: secondCard, index: secondPlayer },
  });

  const thirdPlayedState = currentTrick(secondPlayedState, {
    type: actionTypes.PLAY_CARD,
    playedCard: thirdCard,
    playedByIndex: thirdPlayer,
    winning: { card: thirdCard, index: secondPlayer },
  });

  const nextTrickState = currentTrick(thirdPlayedState, {
    type: actionTypes.PLAY_FOURTH_CARD,
    winner: { card: secondCard, index: secondPlayer },
  });

  describe('PLAY_CARD', () => {
    describe('first card', () => {
      it('assigns the winner when card is played', () => {
        expect(firstPlayedState.winning).toBe(firstPlayer);
      });

      it('adds a single card to the currentTrick cards', () => {
        const cardsInTrick = firstPlayedState.cards.filter(card => card.suit);
        expect(cardsInTrick).toHaveLength(1);
        expect(cardsInTrick[0]).toBe(firstCard);
      });
    });

    describe('second card', () => {
      it('reassigns winner if winner is different', () => {
        expect(secondPlayedState.winning).toBe(secondPlayer);
      });

      it('adds a card to currentTrick cards', () => {
        expect(secondPlayedState.cards.filter(card => card.suit)).toHaveLength(
          2,
        );
      });
    });

    describe('third card', () => {
      it('does not reassign winner if winner is same', () => {
        expect(thirdPlayedState.winning).toBe(secondPlayer);
      });

      it('adds a card to the currentTrick cards', () => {
        expect(thirdPlayedState.cards.filter(card => card.suit)).toHaveLength(
          3,
        );
      });
    });
  });

  describe('PLAY_FOURTH_CARD', () => {
    it('removes all cards from currentTrick', () => {
      expect(nextTrickState.cards.filter(card => card.suit)).toHaveLength(0);
    });

    it('changes firstTurn to winner', () => {
      expect(nextTrickState.firstTurn).toBe(secondPlayer);
    });
  });
});
