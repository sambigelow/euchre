import React from 'react';
import { connect } from 'react-redux';
import { array, number, func, string } from 'prop-types';
import PLAYERS from '../utils/players';
import { stages } from '../utils/constants';
import { discard } from '../actions/calling';
import { playCard } from '../actions/playing';

import styles from './App.css';

const Players = ({ hands, currentTurn, discard, stage, dealer, playCard }) => (
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
          playCard(card, playerIndex);
        }
      };

      console.log({ PLAYERS, playerIndex });

      return (
        <div
          key={playerIndex}
          className={isCurrentTurn ? styles.ActivePlayerTurn : ''}
        >
          <h4>{PLAYERS[playerIndex].name}</h4>
          {hand.error && <h6 style={{ color: 'red' }}>{hand.error}</h6>}
          <ul>
            {hand.cards &&
              hand.cards.map(card => (
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
};

export default connect(
  state => ({
    hands: state.hands,
    firstTurn: state.currentTrick.firstTurn,
    currentTrickCards: state.currentTrick.cards,
    currentTurn: state.round.currentTurn,
    stage: state.round.stage,
    dealer: state.round.dealer,
    trump: state.round.trump,
  }),
  { discard, playCard },
)(Players);
