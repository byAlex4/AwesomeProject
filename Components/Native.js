import React from "react";
import {
  NativeBaseProvider,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
  Center
} from "native-base";

const Button = () => {
  return <Center bg="muted.200" mt={5} w={"80%"}>
    <Pressable bg="primary.300" rounded="xl" h={10} shadow={2} mt={5} mb={5}>
      <Box alignSelf="center"
        _text={{
          fontSize: "md",
          fontWeight: "medium",
          color: "warmGray.50",
          letterSpacing: "lg"
        }}>
        Esta es una caja presionable!
      </Box>
    </Pressable>
  </Center>;
};

const Invi = () => {
  return <Box bg="primary.600" borderRadius="5" rounded="md" w={"90%"} ml={2} mt={5}>
    <HStack justifyContent="space-between">
      <Box justifyContent="space-between" pl={2} pt={2} pb={2}>
        <VStack space="1">
          <Text fontSize="sm" color="white">
            Hoy @ 9PM
          </Text>
          <Text color="white" fontSize="xl" w={220}>
            Hola! Esto es una invitación a Native Base
          </Text>
        </VStack>
        <Pressable rounded="xs" bg="primary.400" alignSelf="flex-start" py="2" px="3" mt={2}>
          <Text textTransform="uppercase" fontSize="sm" fontWeight="bold" color="white">
            Quieres unirte?
          </Text>
        </Pressable>
      </Box>
      <Image source={{
        uri: 'https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg'
      }} alt="Aang flying and surrounded by clouds" h="100" rounded="full" width="100" mt={5} mr={3} />
    </HStack>
  </Box>
};

export default function Native() {
  return (
    <NativeBaseProvider px="3" py="3">
      <Center>
        <Invi/>
        <Button />
      </Center>
    </NativeBaseProvider>
  );
}