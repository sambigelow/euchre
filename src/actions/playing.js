import { actionTypes } from '../utils/constants';
import canPlayCard from '../utils/can-play-card';
import findWinning from '../utils/find-winning';

export const playCard = (playedCard, playedByIndex) => (dispatch, getState) => {
  const {
    currentTrick,
    round: { trump },
    hands,
  } = getState();

  const nextTrickCards = [
    ...currentTrick.cards.slice(0, playedByIndex),
    playedCard,
    ...currentTrick.cards.slice(playedByIndex + 1),
  ];

  const winning = findWinning(trump, nextTrickCards, currentTrick.firstTurn);

  const isFinalCard = currentTrick.cards.filter(card => card.suit).length === 3;

  if (isFinalCard) {
    dispatch({
      type: actionTypes.PLAY_FOURTH_CARD,
      winner: winning,
      playedCard,
      playedByIndex,
    });
  } else if (
    playedByIndex === currentTrick.firstTurn ||
    canPlayCard(
      playedCard,
      hands[playedByIndex].cards,
      currentTrick.cards[currentTrick.firstTurn],
      trump,
    )
  ) {
    console.log('Can play card');
    dispatch({
      type: actionTypes.PLAY_CARD,
      playedCard,
      playedByIndex,
      currentTrick,
      trump,
      isFinalCard,
      winning,
    });
  } else {
    dispatch({
      type: actionTypes.CANT_PLAY_CARD,
      playedByIndex,
    });
  }
};
