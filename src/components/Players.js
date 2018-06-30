import React from 'react';
import { connect } from 'react-redux';
import { array, number, func, string } from 'prop-types';
import PLAYERS from '../utils/players';
import { stages } from '../utils/constants';
import { discard } from '../actions/calling';
import { playCard } from '../actions/playing';
import canPlayCard from '../utils/can-play-card';

import styles from './App.css';

const Players = ({
  hands,
  currentTurn,
  discard,
  stage,
  dealer,
  playCard,
  firstTurn,
  currentTrickCards,
  trump
}) => (
  <React.Fragment>
    <h2>Hands</h2>
    {hands.map((hand, playerIndex) => {
      const isCurrentTurn =
        stage === stages.PRE_DEAL
          ? playerIndex === dealer
          : playerIndex === currentTurn;
      const isDiscarding =
        isCurrentTurn && stage === stages.DISCARDING && playerIndex === dealer;
      const isPlaying = isCurrentTurn && stage === stages.PLAYING;

      const clickHandler = card => () => {
        if (isDiscarding) {
          discard(card);
        } else if (isPlaying) {
          if (playerIndex === firstTurn || canPlayCard(card, hand, currentTrickCards[firstTurn], trump)) {
            playCard(card, playerIndex);
          } else {
            console.error("Can't play that card");
          }
        }
      };

      return (
        <div
          key={playerIndex}
          className={isCurrentTurn ? styles.ActivePlayerTurn : ''}
        >
          <h4>{PLAYERS[playerIndex].name}</h4>
          <ul>
            {hand.map(card => (
              <li key={card.description} onClick={clickHandler(card)}>
                {card.description}
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </React.Fragment>
);

Players.propTypes = {
  hands: array,
  currentTurn: number,
  stage: string,
  discard: func,
  playCard: func,
  dealer: number,
  firstTurn: number,
  currentTrickCards: array,
  trump: string,
};

export default connect(
  state => ({
    hands: state.round.hands,
    firstTurn: state.round.currentTrick.firstTurn,
    currentTrickCards: state.round.currentTrick.cards,
    currentTurn: state.round.currentTurn,
    stage: state.round.stage,
    dealer: state.round.dealer,
    trump: state.round.trump,
  }),
  { discard, playCard },
)(Players);
