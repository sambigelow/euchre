export const initialGameState = {
  points: {
    userTeam: 0,
    opposingTeam: 0,
  },
};

const game = (state = initialGameState, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default game;