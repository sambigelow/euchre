export const suits = {
  SPADES: 'spades',
  HEARTS: 'hearts',
  CLUBS: 'clubs',
  DIAMONDS: 'diamonds',
};

export const values = {
  NINE: '9',
  TEN: '10',
  JACK: 'Jack',
  QUEEN: 'Queen',
  KING: 'King',
  ACE: 'Ace',
};

export const stages = {
  PRE_DEAL: 'pre-deal',
  CALLING_STRICT: 'calling-strict',
  CALLING_OPEN: 'calling-open',
  DISCARD_CALLED: 'discard-called',
  PLAYING: 'playing',
  DISCARDING: 'discarding',
  SCREWING_DEALER: 'screwing-dealer',
};

export const actionTypes = {
  DEAL: 'DEAL',
  PICK_IT_UP: 'PICK_IT_UP',
  PASS: 'PASS',
  CALL_TRUMP: 'CALL_TRUMP',
  DISCARD: 'DISCARD',
  PLAY_CARD: 'PLAY_CARD',
  CANT_PLAY_CARD: 'CANT_PLAY_CARD',
  PLAY_FOURTH_CARD: 'PLAY_FOURTH_CARD',
  ROUND_OVER: 'ROUND_OVER',
};

export const teams = {
  USER_TEAM: 'userTeam',
  OPPOSING_TEAM: 'opposingTeam',
};
