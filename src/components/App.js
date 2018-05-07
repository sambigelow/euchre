import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deal } from '../actions/deal';
import { PLAYERS } from '../utils/constants';
import styles from './App.css';
import { getHands, getKitty } from '../reducers';

class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.deal}>Deal</button>
        <div>
          <h2>Hands</h2>
          {this.props.hands &&
            this.props.hands.map(hand => (
              <ul>{hand.map(card => <li>{card.description}</li>)}</ul>
            ))}
        </div>
        <div>
          <h2>Kitty</h2>
          <ul>
            {this.props.kitty &&
              this.props.kitty.map(card => <li>{card.description}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ hands: getHands(state), kitty: getKitty(state) }),
  { deal },
)(App);
