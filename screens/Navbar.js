import React from "react";
import {
    Icon,
    View,
    Center,
    ScrollView
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from "./Menu";
import Profile from "./Acount"

function HomeScreen() {
    return (
        <ScrollView >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Main />
            </View>
        </ScrollView>
    );
}

function ProfileScreen() {
    return (
        <ScrollView >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Profile />
            </View>
        </ScrollView>
    );
}
const Tab = createBottomTabNavigator();

export default function Footer() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                "tabBarActiveTintColor": "lightgray",
                "tabBarInactiveTintColor": "white",
                "tabBarActiveBackgroundColor": "#7356bf",
                "tabBarInactiveBackgroundColor": "#4b2ba0",
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}
        >
            <Tab.Screen name="Account" component={ProfileScreen} options={{
                headerShown: false,
                tabBarIcon: () => (<Icon as={<AntDesign name="user" size={24} />} color={'white'}></Icon>)
            }} />
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false,
                tabBarIcon: () => (<Icon as={<AntDesign name="home" size={24} />} color={"white"}></Icon>)
            }} />
            <Tab.Screen name="Favorites" component={ProfileScreen} options={{
                headerShown: false,
                tabBarIcon: () => (<Icon as={<AntDesign name="heart" size={24} />} color={"white"} ></Icon>)
            }} />
        </Tab.Navigator>
    );
}