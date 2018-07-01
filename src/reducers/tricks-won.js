import { actionTypes, teams } from '../utils/constants';

const { USER_TEAM, OPPOSING_TEAM } = teams;

const initialTricksWonState = {
  [USER_TEAM]: [],
  [OPPOSING_TEAM]: [],
};

const tricksWon = (state = initialTricksWonState, { type, winner }) => {
  switch (type) {
    case actionTypes.PLAY_FOURTH_CARD:
      if (winner.index % 2 === 0) {
        return {
          ...state,
          [USER_TEAM]: [...state[USER_TEAM], winner.card],
        };
      } else {
        return {
          ...state,
          [OPPOSING_TEAM]: [...state[OPPOSING_TEAM], winner.card],
        };
      }
    case actionTypes.ROUND_OVER:
      return initialTricksWonState;
    default:
      return state;
  }
};

export default tricksWon;
