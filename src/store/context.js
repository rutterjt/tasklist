import React, { useReducer, useContext } from 'react';

import { defaultState, reducer } from './reducer';

const StoreContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <StoreContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
