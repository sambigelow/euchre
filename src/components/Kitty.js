import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';

const Kitty = ({ kitty }) => (
  <React.Fragment>
    <h2>Kitty</h2>
    <ul>{kitty && kitty.map(card => <li>{card.description}</li>)}</ul>
  </React.Fragment>
);

Kitty.propTypes = { kitty: array };

export default connect(state => ({ kitty: state.kitty.cards }))(Kitty);
