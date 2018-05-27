import game, { initialGameState } from './game';
import { actionTypes } from '../utils/constants';

describe('game reducer', () => {
  it('returns default state when irrelevant action is passed', () => {
    const result = game(initialGameState, { type: actionTypes.DEAL });

    expect(result).toEqual(initialGameState);
  });
});
