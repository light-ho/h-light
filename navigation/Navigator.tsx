import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstPage from '../screens/FirstPage';
import { RootStackParamList } from './screens';

import OtherPage from '../screens/OtherPage';

const RootStack = createNativeStackNavigator<RootStackParamList>();


const Stack = createNativeStackNavigator();


function Navigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="FirstPage">
        <RootStack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
        <RootStack.Screen name="OtherPage" component={OtherPage} options={{ title: "otherPage" }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;