import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { stages } from '../utils/constants';

const Trump = ({ trump, stage }) =>
  stage === stages.PLAYING || stage === stages.DISCARDING ? (
    <h2>Trump is: {trump}</h2>
  ) : null;

Trump.propTypes = { trump: string, stage: string };

export default connect(state => ({
  trump: state.round.trump,
  stage: state.round.stage,
}))(Trump);
