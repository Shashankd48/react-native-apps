import React, {createContext, useReducer} from 'react';
import {seasonReducer, initialState} from '../reducers/seasonReducer';

export const SeasonContext = createContext();

const SeasonContextProvider = ({children}) => {
  const [refreshScreen, dispatch] = useReducer(seasonReducer, initialState);

  return (
    <SeasonContext.Provider value={{refreshScreen, dispatch}}>
      {children}
    </SeasonContext.Provider>
  );
};

export default SeasonContextProvider;
