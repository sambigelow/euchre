import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

const Trump = ({ trump, stage }) => (
  <React.Fragment>
    <h2>Trump is: {trump}</h2>
    <h2>Stage is: {stage}</h2>
  </React.Fragment>
);

Trump.propTypes = { trump: string };

export default connect(state => ({
  trump: state.round.trump,
  stage: state.round.stage,
}))(Trump);
