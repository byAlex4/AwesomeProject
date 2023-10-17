import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import AvisosScreen from '../Avisos/AvisosScreen';
import MapScreen from '../Mapa/MapScreen';
import HomeScreen from '../Inicio/HomeScreen';
import ConfigScreen from '../Confi/ConfigScreen';

import MenuMasc from '../Inicio/Menu/MenuMasc';
import Baño from '../Inicio/Menu/Baño';
import Revisión from '../Inicio/Menu/Revisión';
import Cartilla from '../Inicio/Menu/Cartilla';
import Receta from '../Inicio/Menu/Receta';

const HomeStack = createNativeStackNavigator();

function HStack(){
  return (
    <HomeStack.Navigator initialRouteName="InicioScreen" screenOptions={({headerShown: false})}>
      <HomeStack.Screen  name="InicioScreen" component={HomeScreen} options={{headerLeft: () => null,headerShown: true, title: 'Inicio', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }} />
      <HomeStack.Screen  name="Menú" component={MenuMasc} options={{headerLeft: () => null,headerShown: true, title: 'Menú', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
      <HomeStack.Screen  name="Baño" component={Baño} options={{headerLeft: () => null,headerShown: true, title: 'Baño', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
      <HomeStack.Screen  name="Revisión" component={Revisión} options={{headerLeft: () => null,headerShown: true, title: 'Revisión', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
      <HomeStack.Screen  name="Cartilla" component={Cartilla} options={{headerLeft: () => null,headerShown: true, title: 'Cartilla', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
      <HomeStack.Screen  name="Receta" component={Receta} options={{headerLeft: () => null,headerShown: true, title: 'Receta', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
    </HomeStack.Navigator>
    
  )
}

import ChatScreen from '../ChatDoc/ChatScreen';
import ChatDoc from '../ChatDoc/ChatDoc';

const ChatStack = createNativeStackNavigator();

function ChStack(){
  return (
    <ChatStack.Navigator initialRouteName="ChatScreen" screenOptions={({headerShown: false })}>
      <ChatStack.Screen  name="ChatScreen" component={ChatScreen} options={{headerLeft: () => null,headerShown: true, title: 'Chat', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }} />
      <ChatStack.Screen  name="ChatDoc" component={ChatDoc} options={{headerLeft: () => null,headerShown: true, title: 'Chat', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
    </ChatStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function Tabnav() {
  return (
      <Tab.Navigator
        initialRouteName="Home" 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Avisos') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Mapa') {
              iconName = focused ? 'location' : 'location-outline';
            } else if (route.name === 'Chat') {
              iconName = focused ? 'paper-plane' : 'paper-plane-outline';
            } else if (route.name === 'Configuración') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={20} color={color} />;

          },
          headerShown: false,
          tabBarActiveTintColor: '#1AB28E',
          tabBarInactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 15, },
          style: { padding: 10, height: 70, },
          headerStyle: { backgroundColor: '#1AB28E' },
          headerTintColor: '#fff'
        })}
      >
        <Tab.Screen name="Avisos" component={AvisosScreen} options={{headerShown: true, title: 'Avisos', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
        <Tab.Screen name="Mapa" component={MapScreen} options={{headerShown: true, title: 'Mapa', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
        <Tab.Screen name="Home" component={HStack} />
        <Tab.Screen name="Chat" component={ChStack} />
        <Tab.Screen name="Configuración" component={ConfigScreen} options={{headerShown: true, title: 'Configuración', headerStyle: { backgroundColor: '#1AB28E' }, headerTintColor: '#fff' }}/>
      </Tab.Navigator>
  );
}