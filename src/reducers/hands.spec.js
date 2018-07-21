import hands, { initialHandsState } from './hands';
import { actionTypes } from '../utils/constants';
import {
  hands as dealtHands,
  kitty as dealtKitty,
} from '../../__mocks__/dealt';
import { firstDealer as dealer, firstPlayer } from '../utils/players';

describe('hands reducer', () => {
  const dealtState = hands(initialHandsState, {
    type: actionTypes.DEAL,
    dealtHands,
  });

  describe('deal', () => {
    it('deals full hand to each player', () => {
      dealtState.forEach(({ cards }) => {
        expect(cards).toHaveLength(5);
      });
    });

    it('sets error on each hand to null', () => {
      dealtState.forEach(({ error }) => {
        expect(error).toBe(null);
      });
    });
  });

  const cardToPickUp = dealtKitty[0];
  const pickedUpState = hands(dealtState, {
    type: actionTypes.PICK_IT_UP,
    dealer,
    cardToPickUp,
  });

  describe('pick it up', () => {
    it('does not change the hands of any player that is not the dealer', () => {
      pickedUpState.forEach((hand, i) => {
        if (i !== dealer) {
          expect(hand.cards).toEqual(dealtState[i].cards);
          expect(hand.error).toEqual(dealtState[i].error);
        }
      });
    });

    it(`adds a card to the dealer's hand`, () => {
      expect(pickedUpState[dealer].cards).toHaveLength(6);
      expect(pickedUpState[dealer].cards).toContain(cardToPickUp);
    });
  });

  const cardToDiscard = pickedUpState[dealer].cards[0];
  const discardedState = hands(pickedUpState, {
    type: actionTypes.DISCARD,
    dealer,
    cardToDiscard,
  });

  describe('discard', () => {
    it('does not change the hands of any player that is not the dealer', () => {
      discardedState.forEach((hand, i) => {
        if (i !== dealer) {
          expect(hand.cards).toEqual(dealtState[i].cards);
          expect(hand.error).toEqual(dealtState[i].error);
        }
      });
    });

    it(`removes discarded card from dealer's hand`, () => {
      expect(discardedState[dealer].cards).toHaveLength(5);
      expect(discardedState[dealer].cards).not.toContain(cardToDiscard);
    });
  });

  let playedByIndex = firstPlayer;
  const unplayableCardState = hands(discardedState, {
    type: actionTypes.CANT_PLAY_CARD,
    playedByIndex,
  });

  describe(`can't play card`, () => {
    it('adds an error to the card of the playedBy player', () => {
      expect(unplayableCardState[playedByIndex].error).not.toBeNull();
    });

    it('does not change the hand of the current player', () => {
      expect(unplayableCardState[playedByIndex].cards).toEqual(
        discardedState[playedByIndex].cards,
      );
    });

    it('leaves all other player states the same', () => {
      unplayableCardState.forEach((hand, i) => {
        if (i !== playedByIndex) {
          expect(hand).toEqual(discardedState[i]);
        }
      });
    });
  });

  const firstCard = dealtHands[firstPlayer][0];
  const firstCardState = hands(unplayableCardState, {
    type: actionTypes.PLAY_CARD,
    playedByIndex: firstPlayer,
    playedCard: firstCard,
  });

  describe('play card', () => {
    it('sets error to null when card played successfully', () => {
      expect(firstCardState[firstPlayer].error).toBeNull();
    });

    it('removes card from hand of playedBy player', () => {
      const firstPlayerHand = firstCardState[firstPlayer].cards;

      expect(firstPlayerHand).toHaveLength(4);
      expect(firstPlayerHand).not.toContain(firstCard);
    });
  });

  describe('round over', () => {
    it('returns empty hands at end of round', () => {
      const result = hands(firstCardState, { type: actionTypes.ROUND_OVER });
      expect(result).toEqual(initialHandsState);
    });
  });
});
