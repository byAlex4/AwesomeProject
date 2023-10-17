import React from 'react';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Tabs from './Components/Tabs';
import Contactos from './Components/Contactos';
import Slash from "./Components/Slash";

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
          <Stack.Screen
            name={"Login"}
            component={Tabs}
          />

          <Stack.Screen
            name={"Contacto"}
            component={Contactos}
          />

          <Stack.Screen
            name={"Draw"}
            component={Slash}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
};

