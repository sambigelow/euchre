import React from 'react';
import { connect } from 'react-redux';
import { array, number } from 'prop-types';
import PLAYERS from '../utils/players';

import styles from './App.css';

const Players = ({ hands, currentTurn }) => (
  <React.Fragment>
    <h2>Hands</h2>
    {hands.map((hand, playerIndex) => (
      <div className={playerIndex === currentTurn && styles.ActivePlayerTurn}>
        <h4>{PLAYERS[playerIndex].name}</h4>
        <ul>{hand.map(card => <li>{card.description}</li>)}</ul>
      </div>
    ))}
  </React.Fragment>
);

Players.propTypes = {
  hands: array,
  currentTurn: number,
};

export default connect(state => ({
  hands: state.round.hands,
  currentTurn: state.round.currentTurn,
}))(Players);
