import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from "./App/components/Home";
import AllSteps from "./App/components/AllSteps";
import Login from "./App/components/Login";
import Signup from "./App/components/Signup";

const RootStack = createStackNavigator(
  {
    Home: Home,
    AllSteps: AllSteps,
	Login: Login,
	Signup: Signup
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return <AppContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
