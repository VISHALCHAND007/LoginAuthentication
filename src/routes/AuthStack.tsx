import React from 'react';
//screens
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

//type
export type AuthStackItemList = {
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackItemList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerTitleAlign: 'center', headerBackVisible: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};