// An implementation of the fisher-yates algorithm to shuffle-deck
export const shuffle = deck => {
  const CARD_TOTAL = deck.length;

  for (let i = 0; i < CARD_TOTAL; i++) {
    const end = CARD_TOTAL - i - 1;
    const rand = Math.ceil(Math.random() * end);

    const temp = deck[i];
    deck[i] = deck[rand];
    deck[rand] = temp;
  }
  return deck;
};
