import React from 'react';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import Login from "./screens/Login";
import Register from "./screens/Register";
import Main from "./screens/Main";
import Navbar from './screens/Navbar';
import Category from './screens/Category';
import FormReceta from './screens/FormRecepta';
import Recipe from './screens/Recipe';
import Profile from './screens/Account';
import EditProfile from './screens/AccountEdit';
import EditRecipe from './screens/RecipeEdit';
import Favorite from './screens/Favorite';

const Stack = createNativeStackNavigator();
export default function () {
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerTintColor: 'white', statusBarColor: "white" }}>
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
              component={Register}
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
              component={Category}
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
              component={Recipe}
              options={{
                headerStyle: {
                  backgroundColor: "#4b2ba0",
                  color: "#white",
                  statusBarColor: "white"
                }
              }}
            />
            <Stack.Screen
              name={"Favorito"}
              component={Favorite}
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
              component={Profile}
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
              component={EditProfile}
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
              component={EditRecipe}
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

