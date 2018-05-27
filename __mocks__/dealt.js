import { deal } from '../src/actions/deal';

const { dealtHands, dealtKitty } = deal();

export const hands = dealtHands;
export const kitty = dealtKitty;
