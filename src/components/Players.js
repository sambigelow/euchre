import React from 'react';
import { connect } from 'react-redux';
import { array, number, func, string } from 'prop-types';
import PLAYERS from '../utils/players';
import { stages } from '../utils/constants';
import { discard } from '../actions/calling';

import styles from './App.css';

const Players = ({ hands, currentTurn, discard, stage, dealer }) => (
  <React.Fragment>
    <h2>Hands</h2>
    {hands.map((hand, playerIndex) => {
      const isCurrentTurn = playerIndex === currentTurn;
      const isDiscarding =
        isCurrentTurn && stage === stages.DISCARDING && playerIndex === dealer;

      return (
        <div
          key={playerIndex}
          className={isCurrentTurn ? styles.ActivePlayerTurn : ''}
        >
          <h4>{PLAYERS[playerIndex].name}</h4>
          <ul>
            {hand.map(card => (
              <li
                key={card.description}
                onClick={isDiscarding ? () => discard(card) : undefined}
              >
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
  dealer: number,
};

export default connect(
  state => ({
    hands: state.round.hands,
    currentTurn: state.round.currentTurn,
    stage: state.round.stage,
    dealer: state.round.dealer,
  }),
  { discard },
)(Players);
