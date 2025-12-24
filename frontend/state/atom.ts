// state/atom.ts
import { atom } from 'recoil';

export const loggedInState = atom<boolean>({
  key: 'loggedInState',
  default: false,
});