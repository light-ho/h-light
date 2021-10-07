import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstPage from "../screens/FirstPage";
import { RootStackParamList } from "./screens";

import OtherPage from "../screens/OtherPage";
import LocationPage from "../screens/LocationPage";
import { CostEntryScreen } from "../screens/CostEntry";
import GlobalContextProvider from "../context/homeContext";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={FirstPage} />
          <RootStack.Screen
            name="solarCost"
            component={OtherPage}
            options={{ title: "otherPage" }}
          />
          <RootStack.Screen
            name="LocationPage"
            component={LocationPage}
            options={{ title: "LocationPage" }}
          />
          <RootStack.Screen
            name="CostEntryScreen"
            component={CostEntryScreen}
            options={{ title: "Costs entry" }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GlobalContextProvider>
  );
}

export default Navigator;
