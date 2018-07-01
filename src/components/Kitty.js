import React from 'react';
import { connect } from 'react-redux';
import { array, string } from 'prop-types';
import { stages } from '../utils/constants';

const Kitty = ({ kitty, stage }) =>
  stage === stages.CALLING_OPEN ||
  stage === stages.CALLING_STRICT ||
  stage === stages.DISCARDING ? (
    <React.Fragment>
      <h2>Kitty</h2>
      <ul>
        {kitty &&
          kitty.map((card, i) => (
            <li key={card.description}>
              {i === 0 && stage === stages.CALLING_STRICT
                ? card.description
                : 'face down'}
            </li>
          ))}
      </ul>
    </React.Fragment>
  ) : null;

Kitty.propTypes = { kitty: array, stage: string };

export default connect(state => ({
  kitty: state.kitty,
  stage: state.round.stage,
}))(Kitty);
