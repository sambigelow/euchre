import React from 'react';
import { connect } from 'react-redux';
import { number, string } from 'prop-types';
import { stages } from '../utils/constants';

const TricksWon = ({ userTricksCount, opposingTricksCount, stage }) =>
  stage === stages.PLAYING ? (
    <React.Fragment>
      <h2>Score of Round</h2>
      <h3>User Team: {userTricksCount} tricks</h3>
      <h3>Opposing Team: {opposingTricksCount} tricks</h3>
    </React.Fragment>
  ) : null;

TricksWon.propTypes = {
  userTricksCount: number,
  opposingTricksCount: number,
  stage: string,
};

export default connect(state => ({
  userTricksCount: state.tricksWon.userTeam.length,
  opposingTricksCount: state.tricksWon.opposingTeam.length,
  stage: state.round.stage,
}))(TricksWon);
