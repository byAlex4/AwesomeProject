import React from "react";
import {
    Icon,
    View,
    ScrollView,
    Fab
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
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

const ButtonA = () => {
    const navigation = useNavigation();
    return <Fab renderInPortal={false}
        style={{
            backgroundColor: '#7356bf', width: '80',
            height: '80', position: 'absolute',
            bottom: 0,
            right: 0
        }}
        shadow={2} size="2xl"
        icon={<Icon color="white" as={AntDesign}
            name="plus" size="2xl" />}
        onPress={() => navigation.navigate('Crear una receta')} />
}

export default function Footer(props) {
    return (
        <>
            <ButtonA />
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
        </>
    );
}