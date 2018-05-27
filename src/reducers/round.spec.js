import round, { initialRoundState } from './round';
import { actionTypes, stages } from '../utils/constants';
import { hands, kitty } from '../../__mocks__/dealt';
import PLAYERS from '../utils/players';
import { suits } from '../utils/constants';
import { deal } from '../actions/deal';

describe('round reducer', () => {
  it('returns initial state on irrelevant action', () => {
    const result = round(initialRoundState, { type: 'NONSENSE' });

    expect(result).toEqual(initialRoundState);
  });

  describe('deal', () => {
    const action = deal();

    it('creates 4 hands of 5 cards and a kitty of 4', () => {
      const result = round(initialRoundState, action);

      expect(result.hands.length).toBe(4);
      result.hands.forEach(hand => {
        expect(hand.length).toBe(5);
      });
      expect(kitty.length).toBe(4);
    });
  });

  it('assigns cards and changes stage on deal', () => {
    const action = {
      type: actionTypes.DEAL,
      dealtHands: [[1], [2], [3], [4]],
      dealtKitty: [1],
    };
    const result = round(initialRoundState, action);

    expect(result.hands).toEqual(action.dealtHands);
    expect(result.kitty).toEqual(action.dealtKitty);
    expect(result.stage).toBe(stages.CALLING_STRICT);
  });

  describe('calling', () => {
    const initialCallingState = {
      ...initialRoundState,
      hands,
      kitty,
    };
    const dealer = initialCallingState.dealer;

    describe('passing', () => {
      const action = {
        type: actionTypes.PASS,
      };

      it('keeps track of number of passes called', () => {
        const result = round(initialCallingState, action);

        expect(result.passesCalled).toBe(initialCallingState.passesCalled + 1);
      });

      it('changes stage based on number of passes called', () => {
        const result = PLAYERS.reduce((result, _) => {
          return round(result, action);
        }, initialCallingState);

        expect(result.stage).toBe(stages.CALLING_OPEN);

        const newResult = PLAYERS.reduce((result, _, i) => {
          return round(result, action);
        }, result);

        expect(newResult.currentTurn).toBe(dealer);
        expect(newResult.stage).toBe(stages.SCREWING_DEALER);
      });
    });

    describe('pickItUp', () => {
      const action = {
        type: actionTypes.PICK_IT_UP,
        cardToPickUp: kitty[0],
      };

      it('adds the card to the dealers deck', () => {
        const result = round(initialCallingState, action);

        expect(result.hands[dealer].length).toBe(6);
        expect(result.hands[dealer].indexOf(kitty[0])).not.toBe(-1);
      });

      it('changes the stage to discarding', () => {
        const result = round(initialCallingState, action);

        expect(result.stage).toBe(stages.DISCARDING);
        expect(result.currentTurn).toBe(dealer);
      });
    });
  });

  describe('discard', () => {
    const afterPickUpState = round(
      {
        ...initialRoundState,
        kitty,
        hands,
      },
      { type: actionTypes.PICK_IT_UP, cardToPickUp: kitty[0] },
    );
    const cardToDiscard = afterPickUpState.hands[afterPickUpState.dealer][3];
    const dealer = afterPickUpState.dealer;
    const result = round(afterPickUpState, {
      type: actionTypes.DISCARD,
      cardToDiscard,
    });

    it('removes discarded card from hand', () => {
      expect(result.hands[dealer].indexOf(cardToDiscard)).toBe(-1);
      expect(result.hands[dealer].length).toBe(5);
    });

    it('adds the discarded card to the kitty', () => {
      expect(result.kitty.length).toBe(4);
      expect(result.kitty.indexOf(cardToDiscard)).not.toBe(-1);
    });
  });

  describe('callTrump', () => {
    const secondaryCallingState = PLAYERS.reduce(result => {
      return round(result, { type: actionTypes.PASS });
    }, initialRoundState);
    const action = {
      type: actionTypes.CALL_TRUMP,
      trump: suits.HEARTS,
    };
    const result = round(secondaryCallingState, action);

    it('changes stage to playing', () => {
      expect(result.stage).toBe(stages.PLAYING);
      expect(result.currentTurn).toBe(
        PLAYERS[secondaryCallingState.dealer].nextTo,
      );
    });

    it('sets trump', () => {
      expect(result.trump).toBe(suits.HEARTS);
    });
  });
});
