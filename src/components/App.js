import React from 'react';
import { connect } from 'react-redux';
import { deal } from '../actions/deal';
import {
  pickItUp,
  pass,
  callClubs,
  callSpades,
  callHearts,
  callDiamonds,
} from '../actions/calling';
import styles from './App.css';
import PLAYERS from '../utils/players';
import Buttons from './Buttons';
// import { players } from '../utils/constants';
// import { getHands, getKitty } from '../reducers';

class App extends React.Component {
  render() {
    const { currentTurn, kitty, stage, hands } = this.props;

    return (
      <div>
        <Buttons />
        <div>
          <h2>Hands</h2>
          {hands.map((hand, playerIndex) => (
            <div
              className={playerIndex === currentTurn && styles.ActivePlayerTurn}
            >
              <h4>{PLAYERS[playerIndex].name}</h4>
              <ul>{hand.map(card => <li>{card.description}</li>)}</ul>
            </div>
          ))}
        </div>
        <div>
          <h2>Kitty</h2>
          <ul>{kitty && kitty.map(card => <li>{card.description}</li>)}</ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    kitty: state.kitty.cards,
    currentTurn: state.round.currentTurn,
    stage: state.round.stage,
    hands: state.round.hands,
  }),
  { deal, pickItUp, callClubs, callSpades, callHearts, callDiamonds, pass },
)(App);
