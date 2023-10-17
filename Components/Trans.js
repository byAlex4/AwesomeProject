import React from "react";
import { PresenceTransition, Box, Button, Center, NativeBaseProvider, Slide, Text, Alert} from "native-base";

const Show = () => {
  const [showOpen, setShowOpen] = React.useState(false);
  return <Center mb={4}>
      <Button title="econder" onPress={() => setShowOpen(!showOpen)}>
        {showOpen ? "Esconder" : "Mostrar"}
      </Button>
      <PresenceTransition visible={showOpen} initial={{
      opacity: 0,
      scale: 0
    }} animate={{
      opacity: 1,
      scale: 1,
      transition: {
        duration: 250
      }
    }}>
        <Center w="200" h="100" mt="7" bg="teal.500" rounded="md">
          Esto es una transicion de presentacion desbanecida
        </Center>
      </PresenceTransition>
    </Center>;
};

const Conection = () => {
  const [isOpenTop, setIsOpenTop] = React.useState(false);
  const str = `${isOpenTop ? 'Esconder' : 'Checar la conexion'}`;
  return <Box h="32" w="300" mb={8}>
      <Slide in={isOpenTop} placement="top">
        <Alert justifyContent="center" status="error">
          <Alert.Icon />
          <Text color="error.600" fontWeight="medium">
            Error en la conexion
          </Text>
        </Alert>
      </Slide>
      <Button title="mostrar" mt="auto" onPress={() => setIsOpenTop(!isOpenTop)} variant="unstyled" bg="coolGray.700:alpha.30">
        {str}
      </Button>
    </Box>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center px="3" py="3">
                <Show />
                <Conection/>
            </Center>
          </NativeBaseProvider>
        );
    };
    