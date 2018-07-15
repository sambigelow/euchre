import kitty, { initialKittyState } from './kitty';
import { actionTypes } from '../utils/constants';
import {
  kitty as dealtKitty,
  hands as dealtHands,
} from '../../__mocks__/dealt';

describe('kitty reducer', () => {
  const dealtState = kitty(initialKittyState, {
    type: actionTypes.DEAL,
    dealtKitty,
  });

  it('sets dealtKitty', () => {
    expect(dealtState).toHaveLength(4);
  });

  const pickedUpState = kitty(dealtState, {
    type: actionTypes.PICK_IT_UP,
  });

  it('removes top card from kitty on pick it up', () => {
    expect(pickedUpState).toHaveLength(3);
    expect(pickedUpState).not.toContain(dealtState[0]);
  });

  const cardToDiscard = dealtHands[0][0];
  const discardedState = kitty(pickedUpState, {
    type: actionTypes.DISCARD,
    cardToDiscard,
  });

  it('adds discarded card back to kitty', () => {
    expect(discardedState).toHaveLength(4);
    expect(discardedState).toContain(cardToDiscard);
  });

  const roundOverState = kitty(discardedState, {
    type: actionTypes.ROUND_OVER,
  });

  it('clears kitty when round is over', () => {
    expect(roundOverState).toHaveLength(0);
  });
});
