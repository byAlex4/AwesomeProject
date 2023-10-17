import React from 'react';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import Login from "./Components/Login";
import Registro from "./Components/Register";
import Contacto from "./Components/Contactos";

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name={"Login"}
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name={"Registro"}
            component={Registro}
            options={{
              headerStyle : {
                backgroundColor: "#4b2ba0",
                color : "#ffff",
                border: "0px solid #4b2ba0"
              }
            }}
          />

          <Stack.Screen
            name={"Contacto"}
            component={Contacto}
            options={{
              headerShown: false,
              headerStyle : {
                backgroundColor: "#4b2ba0",
                color : "#ffff",
                border: "0px solid #4b2ba0"
              }
            }}
          />
        </Stack.Navigator>

      </NavigationContainer>
    </NativeBaseProvider>
  )
};

