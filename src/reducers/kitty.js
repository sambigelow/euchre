const initialState = [];

export default (state = initialState, { type, kitty }) => {
  switch (type) {
    case 'DEAL':
      return [...kitty];
    default:
      return state;
  }
};

export const getKitty = (state) => state;