import React from 'react';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import Login from "./screens/Login";
import Registro from "./screens/Register";
import Main from "./screens/Menu";
import Navbar from './screens/Navbar';
import Categorias from './screens/Categorias';
import FormReceta from './screens/FormRecepta';
import Receta from './screens/Recipe';
import Account from './screens/Account';
import Edit from './screens/AccountEdit';
import editReceta from './screens/RecipeEdit';

const Stack = createNativeStackNavigator();
export default function () {
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Nav" screenOptions={{ headerTintColor: 'white', statusBarColor: "white" }}>
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
            <Stack.Screen
              name={"Categoria"}
              component={Categorias}
              options={{
                headerStyle: {
                  backgroundColor: "#4b2ba0",
                  color: "#white"
                }
              }}
            />
            <Stack.Screen
              name={"Crear una receta"}
              component={FormReceta}
              options={{
                headerStyle: {
                  backgroundColor: "#4b2ba0",
                  color: "#white",
                  statusBarColor: "white"
                }
              }}
            />
            <Stack.Screen
              name={"Receta"}
              component={Receta}
              options={{
                headerStyle: {
                  backgroundColor: "#4b2ba0",
                  color: "#white",
                  statusBarColor: "white"
                }
              }}
            />
            <Stack.Screen
              name={"Cuenta"}
              component={Account}
              options={{
                headerStyle: {
                  backgroundColor: "#4b2ba0",
                  color: "#white",
                  statusBarColor: "white"
                }
              }}
            />

            <Stack.Screen
              name={"Editar cuenta"}
              component={Edit}
              options={{
                headerStyle: {
                  backgroundColor: "#4b2ba0",
                  color: "#white",
                  statusBarColor: "white"
                }
              }}
            />
            <Stack.Screen
              name={"Editar receta"}
              component={editReceta}
              options={{
                headerStyle: {
                  backgroundColor: "#4b2ba0",
                  color: "#white",
                  statusBarColor: "white"
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  )
};

