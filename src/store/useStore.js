import { useContext } from 'react';
import { StoreContext } from './context';

export const useStore = () => {
  return useContext(StoreContext);
};
