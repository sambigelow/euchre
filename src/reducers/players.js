// import { playerNames } from '../utils/players';
// import { actionTypes } from '../utils/constants';
//
// const defaultPlayerState = {
//   hand: [],
// };
//
// export const initialPlayersState = {
//   [playerNames.USER]: defaultPlayerState,
//   [playerNames.COMPUTER_ONE]: defaultPlayerState,
//   [playerNames.PARTNER]: defaultPlayerState,
//   [playerNames.COMPUTER_TWO]: defaultPlayerState,
// };
//
// const players = (
//   state = initialPlayersState,
//   { type, hands, dealer, calledUpCard, discarded },
// ) => {
//   switch (type) {
//     case actionTypes.DEAL:
//       return {
//         ...Object.keys(state).reduce(
//           (acc, player, i) => ({
//             ...acc,
//             [player]: {
//               ...state[player],
//               hand: hands[i],
//             },
//           }),
//           {},
//         ),
//       };
//     case actionTypes.PICK_IT_UP:
//       return {
//         ...state,
//         [dealer]: {
//           ...state[dealer],
//           hand: [...state[dealer].hand, calledUpCard],
//         },
//       };
//     case actionTypes.DISCARD:
//       const discardIndex = dealerHand.indexOf(discarded);
//
//       return {
//         ...state,
//         [dealer]: {
//           ...state[dealer],
//           hand: [
//             ...state[dealer].hand.slice(0, discardIndex),
//             ...state[dealer].hand.slice(discardIndex),
//           ],
//         },
//       };
//     default:
//       return state;
//   }
// };
//
// export default players;
//
// return {
//   ...state,
//   [playerNames.USER]: {
//     ...state[playerNames.USER],
//     hand: hands[0],
//   },
//   [playerNames.COMPUTER_ONE]: {
//     ...state[playerNames.COMPUTER_ONE],
//     hand: hands[1],
//   },
//   [playerNames.PARTNER]: {
//     ...state[playerNames.PARTNER],
//     hand: hands[2],
//   },
//   [playerNames.COMPUTER_TWO]: {
//     ...state[playerNames],
//     hand: hands[3],
//   },
// };
