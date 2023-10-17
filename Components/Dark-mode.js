import React from "react";
import { NativeBaseProvider, useColorMode, Text, Button, Center, Box, useColorModeValue } from "native-base";

function UseColorMode() {
  const {
    toggleColorMode
  } = useColorMode();
  const text = useColorModeValue("Claro", "Oscuro");
  const bg = useColorModeValue("warmGray.50", "coolGray.800");
  return <Center a>
      <Box flex="1" bg={bg} w="100%" mt={5} pl={5} pr={5} pt={5} pb={5} >
        <Text fontSize="lg" display="flex" mb={20}>
          El modo de color de la pantalla es: {" "}
          <Text bold fontSize="18px">
            {text}
          </Text>
        </Text>
        <Button title="cambiar" onPress={toggleColorMode} h={10}>
          Cambiar
        </Button>
      </Box>
    </Center>;
}

const Example = () => {
  return <NativeBaseProvider>
      <UseColorMode />
    </NativeBaseProvider>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center px="3" py="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
    