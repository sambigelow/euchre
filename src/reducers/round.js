import { actionTypes, stages, teams } from '../utils/constants';
import PLAYERS from '../utils/players';
import findWinning from '../utils/find-winning';
import canPlayCard from '../utils/can-play-card';
import { combineReducers } from 'redux';

const firstPlayer = PLAYERS[0].nextTo;

const initialHand = {
  error: null,
  cards: [],
};

export const initialRoundState = {
  dealer: 0,
  stage: stages.PRE_DEAL,
  passesCalled: 0,
  currentTurn: firstPlayer,
  hands: new Array(4).fill(initialHand),
  kitty: [],
  tricksWon: {
    [teams.USER_TEAM]: [],
    [teams.OPPOSING_TEAM]: [],
  },
  currentTrick: {
    firstTurn: firstPlayer,
    winning: undefined,
    cards: [{}, {}, {}, {}],
  },
};

const round = (
  state = initialRoundState,
  {
    type,
    cardToPickUp,
    dealtKitty,
    trump,
    cardToDiscard,
    playedByIndex,
    playedCard,
  },
) => {
  switch (type) {
    case actionTypes.DEAL:
      const result = {
        ...state,
        stage: stages.CALLING_STRICT,
        kitty: dealtKitty,
      };
      return result;
    case actionTypes.PASS:
      const nextPassesCalled = state.passesCalled + 1;
      let newStage = state.stage;
      let nextTurn = PLAYERS[state.currentTurn].nextTo;

      if (nextPassesCalled >= 7) {
        newStage = stages.SCREWING_DEALER;
        nextTurn = state.dealer;
      } else if (nextPassesCalled > 3) {
        newStage = stages.CALLING_OPEN;
      }

      return {
        ...state,
        passesCalled: nextPassesCalled,
        currentTurn: nextTurn,
        stage: newStage,
      };
    case actionTypes.PICK_IT_UP:
      return {
        ...state,
        trump: cardToPickUp.suit,
        stage: stages.DISCARDING,
        currentTurn: state.dealer,
        kitty: state.kitty.slice(1),
      };
    case actionTypes.DISCARD:
      const { hands, dealer } = state;
      const indexToRemove = hands[state.dealer].cards.indexOf(cardToDiscard);

      return {
        ...state,
        stage: stages.PLAYING,
        kitty: [cardToDiscard, ...state.kitty],
        currentTurn: PLAYERS[dealer].nextTo,
      };
    case actionTypes.CALL_TRUMP:
      return {
        ...state,
        trump,
        currentTurn: PLAYERS[state.dealer].nextTo,
        stage: stages.PLAYING,
      };
    case actionTypes.PLAY_CARD:
      const playedCardCount = state.currentTrick.cards.filter(card => card.suit)
        .length;
      const isFinalCard = playedCardCount === 3;
      const nextCards = [
        ...state.currentTrick.cards.slice(0, playedByIndex),
        playedCard,
        ...state.currentTrick.cards.slice(playedByIndex + 1),
      ];
      const { index: winningIndex } = findWinning(
        state.trump,
        nextCards,
        state.currentTrick[state.currentTrick.firstTurn],
        trump,
      );
      let nextTrick = {
        winning: winningIndex,
        firstTurn: state.currentTrick.firstTurn,
        cards: nextCards,
      };

      let nextTricksWon;

      if (isFinalCard) {
        nextTricksWon = {};
        if (winningIndex % 2 === 0) {
          nextTricksWon.userTeam = [
            ...state.tricksWon.userTeam,
            state.currentTrick,
          ];
          nextTricksWon.opposingTeam = state.tricksWon.opposingTeam;
        } else {
          nextTricksWon.userTeam = state.tricksWon.userTeam;
          nextTricksWon.opposingTeam = [
            ...state.tricksWon.opposingTeam,
            state.currentTrick,
          ];
        }
      }

      if (isFinalCard) {
        nextTrick = {
          winning: undefined,
          firstTurn: winningIndex,
          cards: [{}, {}, {}, {}],
        };
      }

      return {
        ...state,
        currentTurn: isFinalCard ? winningIndex : PLAYERS[playedByIndex].nextTo,
        currentTrick: nextTrick,
        tricksWon: nextTricksWon || state.tricksWon,
      };
    default:
      return state;
  }
};

export default round;
