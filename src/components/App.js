import React from 'react';
import Players from './Players';
import Buttons from './Buttons';
import Kitty from './Kitty';
import Trump from './Trump';

const App = () => (
  <React.Fragment>
    <Buttons />
    <Players />
    <Kitty />
    <Trump />
  </React.Fragment>
);

export default App;
