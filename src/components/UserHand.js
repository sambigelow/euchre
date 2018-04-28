import React from 'react';

export default hand => <ul>{hand.map(card => <li>{card.description}</li>)}</ul>;
