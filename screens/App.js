import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";

import AuthStack from './screens/Navigation/AuthStack';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <AuthStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}


