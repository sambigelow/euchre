import { actionTypes, stages, teams } from '../utils/constants';
import PLAYERS from '../utils/players';

export const initialRoundState = {
  dealer: 0,
  stage: stages.PRE_DEAL,
  passesCalled: 0,
  tricksWon: {
    [teams.USER_TEAM]: [],
    [teams.OPPOSING_TEAM]: [],
  },
  currentTrick: [{}, {}, {}, {}],
  currentTurn: PLAYERS[0].nextTo,
  hands: [[], [], [], []],
  kitty: [],
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
        state.currentTrick.filter(card => card.suit).length === 3;
      let nextTrick = [
        ...state.currentTrick.slice(0, playedByIndex),
        playedCard,
        ...state.currentTrick.slice(playedByIndex + 1),
      ];

      const findHighestIndex = () => 2;

      const addTrick = (trick, team) => {
        if (findHighestIndex(trick) % 2 === 0 && team === 'userTeam') {
          if (team === 'userTeam') {
            return trick;
          }
        }
        return [];
      };

      const nextTricksWon = isFinalCard
        ? {
            userTeam: [
              ...state.tricksWon.userTeam,
              addTrick(nextTrick, 'userTeam'),
            ],
            opposingTeam: [
              ...state.tricksWon.opposingTeam,
              addTrick(nextTrick, 'opposingTeam'),
            ],
          }
        : state.tricksWon;

      if (isFinalCard) {
        nextTrick = [{}, {}, {}, {}];
      }

      return {
        ...state,
        currentTurn: PLAYERS[playedByIndex].nextTo,
        hands: [
          ...state.hands.slice(0, playedByIndex),
          [
            ...state.hands[playedByIndex].slice(0, playedCardIndex),
            ...state.hands[playedByIndex].slice(playedCardIndex + 1),
          ],
          ...state.hands.slice(playedByIndex + 1),
        ],
        currentTrick: nextTrick,
        tricksWon: nextTricksWon,
      };
    default:
      return state;
  }
};

export default round;
