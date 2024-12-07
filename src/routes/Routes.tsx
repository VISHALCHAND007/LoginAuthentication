import {View, Text} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';

//routes
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';

//navigation container
import {NavigationContainer} from '@react-navigation/native';

import Loading from '../components/Loading';
import AppWriteContext from '../app_write/AppWriteContext';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

export const Routes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {appWrite, isLoggedIn, setIsLoggedIn} = useContext(AppWriteContext);

  useEffect(() => {
    appWrite
      .getUserDetails()
      .then(response => {
        setIsLoading(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch(_ => {
        setIsLoggedIn(false);
        setIsLoading(false);
      });
  }, [appWrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
