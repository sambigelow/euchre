import React from 'react';
import Players from './Players';
import Buttons from './Buttons';
import Kitty from './Kitty';
import Trump from './Trump';
import CurrentTrick from './CurrentTrick';
import TricksWon from './TricksWon';

const App = () => (
  <React.Fragment>
    <Buttons />
    <Trump />
    <Players />
    <Kitty />
    <CurrentTrick />
    <TricksWon />
  </React.Fragment>
);

export default App;
