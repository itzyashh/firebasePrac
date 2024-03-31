import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from './routes';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import SignUp from '../screens/SignUp/SignUp';
import { useSelector } from 'react-redux';

export type RootStackParamList = {
  [routes.HOME]: {
    name: string
    age: number
  }
  [routes.LOGIN]: undefined;
  [routes.SIGNUP]: undefined;
  [routes.AUTH]: undefined;
  [routes.MAIN]: undefined;
} 

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name={routes.LOGIN} component={Login} />
      <Stack.Screen name={routes.SIGNUP} component={SignUp} />
    </Stack.Navigator>
  )
}

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name={routes.HOME} component={Home} />
    </Stack.Navigator>
  )
};

const RootNavigation = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      {isLoggedIn ? (
        <Stack.Screen name={routes.MAIN} component={MainNavigation} />
      ) : (
        <Stack.Screen name={routes.AUTH} component={AuthStack} />
      )}
    </Stack.Navigator>
  )
}

export default RootNavigation;