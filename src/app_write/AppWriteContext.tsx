import {View, Text} from 'react-native';
import React, {createContext, FC, useState} from 'react';

import AppWriteService from './service';
import {PropsWithChildren} from 'react';

type AppContextType = {
  appWrite: AppWriteService;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppWriteContext = createContext<AppContextType>({
  appWrite: new AppWriteService(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const AppWriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appWrite: new AppWriteService(),
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AppWriteContext.Provider value={defaultValue}>
      {children}
    </AppWriteContext.Provider>
  );
};

export default AppWriteContext;
