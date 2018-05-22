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
import { stages, suits } from '../utils/constants';
import { playerNames } from '../utils/players';
import PLAYERS from '../utils/players';
// import { players } from '../utils/constants';
// import { getHands, getKitty } from '../reducers';

class App extends React.Component {
  render() {
    const {
      players: playerState,
      currentTurn,
      deal,
      kitty,
      stage,
      pickItUp,
      pass,
      callHearts,
      callClubs,
      callDiamonds,
      callSpades,
      hands,
    } = this.props;
    const getButtons = () => {
      switch (stage) {
        case stages.PRE_DEAL:
          return <button onClick={deal}>Deal</button>;
        case stages.CALLING_STRICT:
          return (
            <React.Fragment>
              <button onClick={() => { pickItUp(kitty[0]) }}>Pick It Up</button>
              <button onClick={pass}>Pass</button>
            </React.Fragment>
          );
        case stages.CALLING_OPEN:
          return (
            <React.Fragment>
              <button onClick={callDiamonds}>Diamonds</button>
              <button onClick={callClubs}>Clubs</button>
              <button onClick={callHearts}>Hearts</button>
              <button onClick={callSpades}>Spades</button>
            </React.Fragment>
          );
        default:
          return null;
      }
    };

    return (
      <div>
        {getButtons()}
        <div>
          <h2>Hands</h2>
          {hands.map((hand, i) => (
            <div className={i === currentTurn && styles.ActivePlayerTurn}>
              <h4>{PLAYERS[i].name}</h4>
              <ul>
                {hand.map(card => (
                  <li>{card.description}</li>
                ))}
              </ul>
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
