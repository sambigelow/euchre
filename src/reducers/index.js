import { combineReducers } from 'redux';
import { actionTypes, stages } from '../utils/constants';
import initialState from './initial-state';

const app = (state = initialState, { type, ...payload }) => {
  switch (type) {
    case actionTypes.DEAL:
      return {
        ...state,
        round: {
          ...state.round,
          stage: stages.CALLING_STRICT,
        },
        kitty: {
          ...state.kitty,
          cards: payload.kitty,
        },
        players: {
          [state.round.sequence[0]]: { hand: payload.hands[0] },
          [state.round.sequence[1]]: { hand: payload.hands[1] },
          [state.round.sequence[2]]: { hand: payload.hands[2] },
          [state.round.sequence[3]]: { hand: payload.hands[3] },
        },
      };
    case actionTypes.PASS:
      let nextTurn = state.round.currentTurn + 1;
      let flipKitty = false;
      if (nextTurn > 3) {
        nextTurn = 0;
        flipKitty = true;
      }

      return {
        ...state,
        round: {
          ...state.round,
          currentTurn: nextTurn,
          stage: flipKitty ? stages.CALLING_OPEN : state.round.stage,
        },
        kitty: {
          ...state.kitty,
          flipped: flipKitty,
        },
      };
    case actionTypes.PICK_IT_UP:
      return {
        ...state,
        round: {
          ...state.round,
          trump: payload.suit,
          stage: stages.PLAYING,
          currentTurn: 0,
        },
        kitty: {
          flipped: true,
          cards: state.kitty.slice(1, 4),
        },
        players: {
          ...state.players,
          [state.game.round.dealer]: {
            hand: [
              ...state.players[state.game.round.dealer],
              state.game.round.kitty[0],
            ],
          },
        },
      };
    case actionTypes.CALL_TRUMP:
      return {
        ...state,
        round: {
          ...state.round,
        },
      };
    case actionTypes.DISCARD_CALLED:
      const dealer = state.round.dealer;
      const discarded = payload.card;
      const dealerHand = state.players[dealer].hand;
      const discardIndex = dealerHand.indexOf(discarded);

      return {
        ...state,
        round: {
          ...state.round,
        },
        kitty: {
          ...state.kitty,
          cards: [...state.kitty, discarded],
        },
        players: {
          ...state.players,
          [dealer]: {
            hand: [
              ...dealerHand.slice(0, discardIndex),
              ...dealerHand.slice(discardIndex + 1),
            ],
          },
        },
      };
    default:
      return state;
  }
};

export default app;
