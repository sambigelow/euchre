import React from 'react';
import { deck } from '../utils/create-deck';
import { shuffle } from '../utils/shuffle';
import { PLAYERS } from '../utils/constants';
import styles from './App.css';

export default class App extends React.Component {
  state = {
    dealt: false,
    players: [
      { name: 'You', cards: [], id: 'user' },
      { name: 'Competitor 1', cards: [], id: 'comp1' },
      { name: 'Your Partner', cards: [], id: 'partner' },
      { name: 'Competitor 2', cards: [], id: 'comp2' }
    ],
    kitty: [],
    dealer: PLAYERS.user,
    trump: 'none',
    turn: PLAYERS.comp1
  };

  deck = deck;

  deal = () => {
    const deck = shuffle(this.deck);

    this.setState({
      ...this.state,
      dealt: true,
      players: [
        {
          ...this.state.players[0],
          cards: deck.slice(0, 5)
        },
        {
          ...this.state.players[1],
          cards: deck.slice(5, 10)
        },
        {
          ...this.state.players[2],
          cards: deck.slice(10, 15)
        },
        {
          ...this.state.players[3],
          cards: deck.slice(15, 20)
        }
      ],
      kitty: deck.slice(20)
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <button onClick={this.deal}>Deal Cards</button>
        <h4>Trump is: {this.state.trump}</h4>
        <div>
          {this.state.players.map((player, i) => (
            <div
              key={player.id}
              className={
                console.log(i, this.state.turn) || i === this.state.turn
                  ? styles.ActivePlayerTurn
                  : ''
              }
            >
              <h4>{player.name}</h4>
              <ul>
                {player.cards.map(card => (
                  <li key={card.description}>{card.description}</li>
                ))}
              </ul>
            </div>
          ))}
          {this.state.dealt && (
            <div>
              <button
                onClick={() => {
                  this.setState({ trump: this.state.kitty[0].suit });
                }}
              >
                {this.state.kitty[0] && this.state.kitty[0].description}
              </button>
              <button
                onClick={() => {
                  this.setState({ turn: this.state.turn + 1 });
                }}
              >
                Pass
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
