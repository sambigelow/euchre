import { callTrump, pickItUp, pass, discard } from './calling';
import { actionTypes, suits } from '../utils/constants';

describe('calling', () => {
  it('calls trump based on suit', () => {
    const callAnything = callTrump('anything');

    expect(callAnything()).toEqual({
      type: actionTypes.CALL_TRUMP,
      trump: 'anything',
    });
  });

  it('calls pass', () => {
    expect(pass()).toEqual({ type: actionTypes.PASS });
  });

  it('returns cardToDiscard', () => {
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue({ round: { dealer: 1 } });

    discard(1)(dispatch, getState);

    expect(dispatch).toBeCalledWith({
      type: actionTypes.DISCARD,
      cardToDiscard: 1,
      dealer: 1,
    });
  });
});
