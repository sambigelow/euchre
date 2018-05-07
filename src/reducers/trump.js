const initialState = {
  selected: false,
  suit: null
};

const trump = (state = initialState, { type, suit }) => {
  switch (type) {
    case 'DEAL':
      return { ...initialState };
    case 'SELECT_TRUMP':
      return {
        selected: true,
        suit
      };
    default:
      return state;
  }
};

export default trump;
