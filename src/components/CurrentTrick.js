import React from 'react';
import { connect } from 'react-redux';
import { array, string } from 'prop-types';
import { stages } from '../utils/constants';

const CurrentTrick = ({ currentTrick, stage }) =>
  stage === stages.PLAYING ? (
    <React.Fragment>
      <h2>Current Trick</h2>
      <ol>{currentTrick.map(card => <li>{card.description}</li>)}</ol>
    </React.Fragment>
  ) : null;

CurrentTrick.propTypes = {
  currentTrick: array,
  stage: string,
};

export default connect(state => ({
  currentTrick: state.round.currentTrick,
  stage: state.round.stage,
}))(CurrentTrick);
