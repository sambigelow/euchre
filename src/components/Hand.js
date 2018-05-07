import React from 'react';
import { connect } from 'react-redux';

import { getHand } from '../reducers';

const Hand = ({ hand }) => <li>{hand.map(card => card.description)}</li>;

export default connect((state, { player }) => ({
  hand: getHand(state, player),
}))(Hand);
