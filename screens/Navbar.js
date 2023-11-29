import React from "react";
import {
    Icon,
    View,
    ScrollView,
    Fab
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from "./Main";
import Profile from "./Account";
import Favs from './Favs';
import { onAuthStateChanged } from "firebase/auth";
import firebase from "../backend/Firebase";

function HomeScreen() {
    return (
        <ScrollView >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
                <Main />
            </View>
        </ScrollView>
    );
}

function ProfileScreen() {
    return (
        <ScrollView >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
                <Profile />
            </View>
        </ScrollView>
    )
}

function FavScreen() {
    return (
        <ScrollView >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: '100%' }}>
                <Favs />
            </View>
        </ScrollView>
    );
}

const ButtonA = () => {
    const navigation = useNavigation();
    const handelPress = () => {
        const user = firebase.auth.currentUser;
        if (user) {
            const uid = user.uid;
            navigation.navigate('Crear una receta', { uid });
        }
    }
    return (
        <Fab renderInPortal={false}
            style={{
                backgroundColor: '#7356bf', width: '16%',
                height: '8%', position: 'absolute',
                bottom: '8%',
                right: '2%'
            }}
            shadow={2} size="2xl"
            icon={<Icon color="white" as={AntDesign}
                name="plus" size="2xl" />}
            onPress={handelPress} />
    )
}

const Tab = createBottomTabNavigator();
export default function () {
    const navigation = useNavigation();
    onAuthStateChanged(firebase.auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
            navigation.navigate("Login");
        }
    })
    return (
        <View minW={'100%'} minH={'100%'} bottom={0} mt={'auto'}>
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
                    tabBarIcon: ({ focused }) => (focused ? <Icon as={<Entypo name='user' size={24} />} color={'white'} fill={'white'}></Icon>
                        : <Icon as={<AntDesign name='user' size={24} />} color={'white'}></Icon >)
                }} />
                <Tab.Screen name="Home" component={HomeScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (focused ? <Icon as={<Entypo name='home' size={24} />} color={'white'}></Icon>
                        : <Icon as={<AntDesign name='home' size={24} />} color={'white'}></Icon >)
                }} />
                <Tab.Screen name="Favorites" component={FavScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (focused ? <Icon as={<AntDesign name='heart' size={24} />} color={'white'}></Icon>
                        : <Icon as={<AntDesign name='hearto' size={24} />} color={'white'}></Icon >)
                }} />
            </Tab.Navigator>
        </View>
    );
}