import { atom } from 'recoil';

export const GlobalErrorState = atom<any | null>({
  key: 'GlobalErrorState',
  default: null,
});
