import { actionTypes } from '../utils/constants';
import canPlayCard from '../utils/can-play-card';
import findWinning from '../utils/find-winning';

export const playCard = (playedCard, playedByIndex) => (dispatch, getState) => {
  const {
    currentTrick,
    round: { trump },
    hands,
  } = getState();

  const winning = findWinning(
    trump,
    currentTrick.cards,
    currentTrick.firstTurn,
  );

  const isFinalCard = currentTrick.cards.filter(card => card.suit).length === 3;

  if (isFinalCard) {
    dispatch({
      type: actionTypes.FINAL_CARD,
      
    })
  }
  if (
    playedByIndex === currentTrick.firstTurn ||
    canPlayCard(
      playCard,
      hands[playedByIndex],
      currentTrick.cards[currentTrick.firstTurn],
      trump,
    )
  ) {
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
