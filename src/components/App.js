import React from 'react';
import { connect } from 'react-redux';
import { deal } from '../actions/deal';
import {
  pickItUp,
  callClubs,
  callSpades,
  callHearts,
  callDiamonds,
} from '../actions/calling';
import styles from './App.css';
import { stages, suits } from '../utils/constants';
// import { players } from '../utils/constants';
// import { getHands, getKitty } from '../reducers';

class App extends React.Component {
  render() {
    const { players, currentTurn, deal, kitty, sequence, stage } = this.props;
    const getButtons = () => {
      switch (stage) {
        case stages.PRE_DEAL:
          return <button onClick={deal}>Deal</button>;
        case stages.CALLING_STRICT:
          return <button onClick={pickItUp}>Pick It Up</button>;
        case stages.CALLING_OPEN:
          return (
            <div>
              <button onClick={callDiamonds}>Diamonds</button>
              <button onClick={callClubs}>Clubs</button>
              <button onClick={callHearts}>Hearts</button>
              <button onClick={callSpades}>Spades</button>
            </div>
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
          {sequence &&
            sequence.map(player => (
              <div
                className={
                  players[player].id === sequence[currentTurn] &&
                  styles.ActivePlayerTurn
                }
              >
                <h4>{players[player].name}</h4>
                <ul>
                  {players[player].hand.map(card => (
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
    players: state.players,
    kitty: state.kitty.cards,
    currentTurn: state.round.currentTurn,
    sequence: state.round.sequence,
    stage: state.round.stage,
  }),
  { deal, pickItUp, callClubs, callSpades, callHearts, callDiamonds },
)(App);
