import React from 'react';
import { connect } from 'react-redux';
import { object, string } from 'prop-types';
import { stages } from '../utils/constants';
import cx from 'classnames';

import styles from './App.css';

const CurrentTrick = ({ currentTrick, stage }) =>
  stage === stages.PLAYING ? (
    <React.Fragment>
      <h2>Current Trick</h2>
      <ol>
        {currentTrick.cards.map((card, i) => (
          <li
            key={card.description}
            className={cx({
              [styles.WinningCard]: i === currentTrick.winning,
            })}
          >
            {card.description}
          </li>
        ))}
      </ol>
    </React.Fragment>
  ) : null;

CurrentTrick.propTypes = {
  currentTrick: object,
  stage: string,
};

export default connect(state => ({
  currentTrick: state.round.currentTrick,
  stage: state.round.stage,
}))(CurrentTrick);
