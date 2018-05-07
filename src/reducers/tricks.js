export const teams = {
  USER_TEAM: 'USER_TEAM',
  COMPUTER_TEAM: 'COMPUTER_TEAM',
};

const initialState = {
  [teams.USER_TEAM]: [],
  [teams.COMPUTER_TEAM]: [],
};

const tricks = (state = initialState, { type, trick, team }) => {
  switch (type) {
    case 'TRICK':
      return {
        ...state,
        [team]: [...state[team], trick],
      };
    default:
      return state;
  }
};

export default tricks;
