import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';

export type AppStackItemList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackItemList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerTitleAlign: 'center', headerBackVisible: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
