import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Petcontrol from '../Login/Petcontrol';
import Login from '../Login/Login';
import Register from '../Login/Register';
import Appchido from './Appchido';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Petcontrol" screenOptions={{ headerShown: false }} >
            <Stack.Screen
                name={"Petcontrol"}
                component={Petcontrol}
            />

            <Stack.Screen
                name={"Login"}
                component={Login}
            />

            <Stack.Screen
                name={"Register"}
                component={Register}
            />

            <Stack.Screen
                name={"App"}
                component={Appchido}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;