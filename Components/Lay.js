import React from "react";
import {
  Flex,
  Center,
  Heading,
  View,
  VStack,
  Divider,
  Box,
  NativeBaseProvider,
  Container,
  Text,
  HStack,
  ScrollView
} from "native-base";

function Content() {
  return <Center>
    <Container>
      <Heading>
        A component library for the
        <Text color="emerald.500"> React Ecosystem</Text>
      </Heading>
      <Text mt="3" fontWeight="medium">
        NativeBase is a simple, modular and accessible component library that
        gives you building blocks to build you React applications.
      </Text>
    </Container>
  </Center>;
}

function Flexy() {
  return <Box flex={1}>
    <ScrollView>
      <VStack space={2.5} w="100%" px="3">
        {
          /* flexDirection -> row */
        }
        <Heading size="md">row</Heading>
        <Flex direction="row" mb="2.5" mt="1.5">
          <Center size="16" bg="primary.100" _text={{
            color: "coolGray.800"
          }}>
            100
          </Center>
          <Center size="16" bg="primary.200" _text={{
            color: "coolGray.800"
          }}>
            200
          </Center>
          <Center bg="primary.300" size="16" _text={{
            color: "coolGray.800"
          }}>
            300
          </Center>
          <Center size="16" bg="primary.400" _text={{
            color: "coolGray.800"
          }}>
            400
          </Center>
        </Flex>
        <Divider />
        {
          /* flexDirection -> column */
        }
        <Heading size="md">column</Heading>

        <Flex direction="column" mb="2.5" mt="1.5">
          <Center size="16" bg="primary.100" _text={{
            color: "coolGray.800"
          }}>
            100
          </Center>
          <Center size="16" bg="primary.200" _text={{
            color: "coolGray.800"
          }}>
            200
          </Center>
          <Center bg="primary.300" size="16" _text={{
            color: "coolGray.800"
          }}>
            300
          </Center>
          <Center size="16" bg="primary.400" _text={{
            color: "coolGray.800"
          }}>
            400
          </Center>
        </Flex>
      </VStack>
    </ScrollView>
  </Box>;
}

function Horizontal() {
  return <HStack space={3} justifyContent="center" mt={5}>
    <Center h="40" w="20" bg="primary.300" rounded="md" shadow={3} />
    <Center h="40" w="20" bg="primary.500" rounded="md" shadow={3} />
    <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} />
  </HStack>
}

export default () => {
  return (
    <NativeBaseProvider>
    <ScrollView px="3" py="3">
      <Center>
        <Content />
        <Flexy />
        <Horizontal />
      </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
};
