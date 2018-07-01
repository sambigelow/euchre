import { actionTypes, teams } from '../utils/constants';

const { USER_TEAM, OPPOSING_TEAM } = teams;

export const initialGameState = {
  points: {
    [USER_TEAM]: 0,
    [OPPOSING_TEAM]: 0,
  },
};

const game = (
  state = initialGameState,
  { type, winningTeam, wentAlone = false, eucher = false },
) => {
  switch (type) {
    case actionTypes.ROUND_OVER:
      let points = 1;

      if (eucher) points = 2;
      if (wentAlone) points = 4;

      return {
        points: {
          [USER_TEAM]:
            state.points[USER_TEAM] + (winningTeam === USER_TEAM ? points : 0),
          [OPPOSING_TEAM]:
            state.points[OPPOSING_TEAM] +
            (winningTeam === OPPOSING_TEAM ? points : 0),
        },
      };
    default:
      return state;
  }
};

export default game;
