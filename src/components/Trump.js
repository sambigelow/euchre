import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

const Trump = ({ trump }) => <h2>Trump is: {trump}</h2>;

Trump.propTypes = { trump: string };

export default connect(state => ({
  trump: state.round.trump,
}))(Trump);
