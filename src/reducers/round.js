import { actionTypes, stages, teams } from '../utils/constants';
import PLAYERS from '../utils/players';
import findWinning from '../utils/find-winning';

const firstPlayer = PLAYERS[0].nextTo;

export const initialRoundState = {
  dealer: 0,
  stage: stages.PRE_DEAL,
  passesCalled: 0,
  currentTurn: firstPlayer,
  hands: [[], [], [], []],
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
    dealtHands,
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
        hands: dealtHands,
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
        hands: [
          ...state.hands.slice(0, state.dealer),
          [...state.hands[state.dealer], cardToPickUp],
          ...state.hands.slice(state.dealer + 1),
        ],
        currentTurn: state.dealer,
        kitty: state.kitty.slice(1),
      };
    case actionTypes.DISCARD:
      const { hands, dealer } = state;
      const indexToRemove = hands[state.dealer].indexOf(cardToDiscard);
      const dealerHand = [
        ...hands[dealer].slice(0, indexToRemove),
        ...hands[dealer].slice(indexToRemove + 1),
      ];

      return {
        ...state,
        stage: stages.PLAYING,
        hands: [
          ...hands.slice(0, dealer),
          dealerHand,
          ...hands.slice(dealer + 1),
        ],
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
      const playedCardIndex = state.hands[playedByIndex].indexOf(playedCard);
      const isFinalCard =
        state.currentTrick.cards.filter(card => card.suit).length === 3;
      const nextCards = [
        ...state.currentTrick.cards.slice(0, playedByIndex),
        playedCard,
        ...state.currentTrick.cards.slice(playedByIndex + 1),
      ];
      const { index: winningIndex } = findWinning(
        state.trump,
        nextCards,
        state.currentTrick.firstTurn,
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
        hands: [
          ...state.hands.slice(0, playedByIndex),
          [
            ...state.hands[playedByIndex].slice(0, playedCardIndex),
            ...state.hands[playedByIndex].slice(playedCardIndex + 1),
          ],
          ...state.hands.slice(playedByIndex + 1),
        ],
        currentTrick: nextTrick,
        tricksWon: nextTricksWon || state.tricksWon,
      };
    default:
      return state;
  }
};

export default round;
