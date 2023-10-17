import React from 'react';
import { Box, Center, NativeBaseProvider } from 'native-base';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

const Boton = () => {
  return <>
    <Box p="2" bg="primary.500" _text={{
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'warmGray.50',
      letterSpacing: 'lg'
    }} mt={"5%"} shadow={2}>
      Esto es una caja
    </Box>
  </>;
}

const Example = () => {
  return <Box mt={"5%"} bg={{
    linearGradient: {
      colors: ['lightBlue.300', 'violet.800'],
      start: [0, 0],
      end: [1, 0]
    }
  }} p="12" rounded="xl" _text={{
    fontSize: 'md',
    fontWeight: 'medium',
    color: 'warmGray.50',
    textAlign: 'center'
  }}>
    Esta es una caja con Linear Gradient
    <Boton/>
  </Box>;
};

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default () => {
  return (
    <NativeBaseProvider config={config}>
      <Center px="3" py="3">
        <Boton />
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
