import React from 'react';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Login from "./Components/Login";
import Registro from "./Components/Register";
import Main from "./Components/Menu";
import Navbar from './Components/Navbar';

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: 'white', statusBarColor:"white" }}>
          <Stack.Screen
            name={"Login"}
            component={Login}
            options={{
              headerShown: false,
              statusBarColor: "white"
            }}
          />

          <Stack.Screen
            name={"Registro"}
            component={Registro}
            options={{
              headerStyle: {
                backgroundColor: "#4b2ba0",
                color: "white",
                border: "1px solid #4b2ba0",
                statusBarColor: "white"
              }
            }}
          />
          
          <Stack.Screen
            name={"Nav"}
            component={Navbar}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#4b2ba0",
                color: "#white"
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
};

