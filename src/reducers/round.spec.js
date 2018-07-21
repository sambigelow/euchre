import round, { initialRoundState } from './round';
import { actionTypes, stages, suits } from '../utils/constants';
import { hands, kitty } from '../../__mocks__/dealt';
import PLAYERS from '../utils/players';
import { deal } from '../actions/deal';

describe('round reducer', () => {
  it('returns initial state on irrelevant action', () => {
    const result = round(initialRoundState, { type: 'NONSENSE' });

    expect(result).toEqual(initialRoundState);
  });

  it('changes stage to callingStrict after deal', () => {
    const result = round(initialRoundState, deal());

    expect(result.stage).toBe(stages.CALLING_STRICT);
  });

  const initialCallingState = {
    ...initialRoundState,
    stage: stages.CALLING_STRICT,
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

  const afterPickUpState = round(initialCallingState, {
    type: actionTypes.PICK_IT_UP,
    cardToPickUp: kitty[0],
  });

  it('changes the stage to discarding', () => {
    expect(afterPickUpState.stage).toBe(stages.DISCARDING);
    expect(afterPickUpState.currentTurn).toBe(dealer);
  });

  describe('discard', () => {
    it('sets stage to playing', () => {
      const result = round(afterPickUpState, {
        type: actionTypes.DISCARD,
        cardToDiscard: kitty[0],
      });

      expect(result.stage).toBe(stages.PLAYING);
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
