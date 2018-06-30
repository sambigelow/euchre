import { actionTypes } from '../utils/constants';
import canPlayCard from '../utils/can-play-card';

export const playCard = (playedCard, playedByIndex) => (dispatch, getState) => {
  const {
    currentTrick,
    round: { trump },
    hands,
  } = getState();
  
  canPlayCard(
    playCard,
    hands[playedByIndex],
    currentTrick.cards[currentTrick.firstTurn],
    trump,
  )
    ? dispatch({
        type: actionTypes.PLAY_CARD,
        playedCard,
        playedByIndex,
        currentTrick,
        trump,
      })
    : dispatch({
        type: actionTypes.CANT_PLAY_CARD,
        playedByIndex,
      });
};
