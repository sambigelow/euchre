import React from 'react';
import { connect } from 'react-redux';
import { func, string, object } from 'prop-types';
import { deal } from '../actions/deal';
import {
  pickItUp,
  pass,
  callClubs,
  callSpades,
  callDiamonds,
  callHearts,
} from '../actions/calling';
import { stages } from '../utils/constants';

const Buttons = ({
  stage,
  cardToPickUp,
  deal,
  pickItUp,
  callClubs,
  callSpades,
  callHearts,
  callDiamonds,
  pass,
  dealer,
}) => {
  switch (stage) {
    case stages.PRE_DEAL:
      return <button onClick={deal}>Deal</button>;
    case stages.CALLING_STRICT:
      return (
        <React.Fragment>
          <button
            onClick={() => {
              pickItUp(cardToPickUp, dealer);
            }}
          >
            Pick It Up
          </button>
          <button onClick={pass}>Pass</button>
        </React.Fragment>
      );
    case stages.CALLING_OPEN:
    case stages.SCREWING_DEALER:
      return (
        <React.Fragment>
          <button onClick={callDiamonds}>Diamonds</button>
          <button onClick={callClubs}>Clubs</button>
          <button onClick={callHearts}>Hearts</button>
          <button onClick={callSpades}>Spades</button>
          {stage !== stages.SCREWING_DEALER && (
            <button onClick={pass}>Pass</button>
          )}
        </React.Fragment>
      );
    default:
      return null;
  }
};

Buttons.propTypes = {
  cardToPickUp: object,
  stage: string.isRequired,
  deal: func.isRequired,
  pickItUp: func.isRequired,
  pass: func.isRequired,
  callClubs: func.isRequired,
  callSpades: func.isRequired,
  callHearts: func.isRequired,
  callDiamonds: func.isRequired,
};

export default connect(
  state => ({
    currentTurn: state.round.currentTurn,
    stage: state.round.stage,
    cardToPickUp: state.kitty[0],
    dealer: state.round.dealer,
  }),
  { deal, pickItUp, pass, callClubs, callSpades, callHearts, callDiamonds },
)(Buttons);
