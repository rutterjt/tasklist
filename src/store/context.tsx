import React, { useReducer } from 'react';

import { StateType, ActionType, defaultState, reducer } from './reducer';

type ContextType = {
  dispatch: React.Dispatch<ActionType>;
} & StateType;

export const StoreContext = React.createContext<ContextType>({
  ...defaultState,
  dispatch: () => null,
});

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  return (
    <StoreContext.Provider value={{ dispatch, ...state }}>
      {children}
    </StoreContext.Provider>
  );
};
