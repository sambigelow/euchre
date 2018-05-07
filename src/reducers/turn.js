export const callingOptions = {
  PASS: 'PASS',
  PICK_IT_UP: 'PICK_IT_UP',
};

const stages = {
  CALLING: 'CALLING',
  TRICKS: 'TRICKS',
};

const initialState = {
  player: 0,
  dealer: 3,
  stage: {
    current: stages.CALLING,
    [stages.CALLING]: {
      options: callingOptions,
      named: true,
    },
  },
};

export default (state = initialState, { type }) => {
  switch (type) {
    case callingOptions.PASS:
      const nextPlayer = state.player + 1;
      return {
        ...state,
        player: nextPlayer > 3 ? 0 : nextPlayer,
      };
    case callingOptions.PICK_IT_UP:
      return {
        ...state,
        player: 0,
        stage: {
          ...state.stage,
          current: stages.TRICKS,
        },
      };
    default:
      return state;
  }
};


export const getCurrentTurn = (state) => state.player;