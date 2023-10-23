import React from 'react';
import {
    Box, Center, NativeBaseProvider, View, Avatar,
    Button, HStack, VStack, Text, AspectRatio, Stack, Heading, Image, ScrollView
} from 'native-base';

function Profile({ props }) {
    return (
        <View>
            <Box bg={"black"} rounded={"0px 10px 10px 0px"} pl={48} pr={48} pt={20}>
                This is a Box with Linear Gradient
            </Box>
            <Box ml={"10%"} w={"80%"}>
                <HStack>
                    <VStack>
                        <Avatar bg="amber.500" source={{
                            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }} size="2xl" mt={"-40%"}>
                            <Avatar.Badge bg="green.500" />
                        </Avatar>
                        <Button size="sm" variant="outline" mt={4}>Editar perfil</Button>
                    </VStack>
                    <HStack ml={"auto"} mt={4} right={2} space={4}>
                        <VStack>
                            <Text bold textAlign={"center"}>23</Text>
                            <Text>Recetas</Text>
                        </VStack>
                        <VStack>
                            <Text bold textAlign={"center"}>1456</Text>
                            <Text>Seguidores</Text>
                        </VStack>
                        <VStack>
                            <Text bold textAlign={"center"}>68</Text>
                            <Text>Seguidos</Text>
                        </VStack>
                    </HStack>
                </HStack>

                <VStack mt={5}>
                    <Text bold>About</Text>
                    <Text>Chef de mexico</Text>
                    <Text>Ganador de 3 premios en master chef</Text>
                    <Text>5 estrellas michelin</Text>
                    <Text>Comparto recetas por gusto</Text>
                </VStack>

                <VStack mt={5} space={4}>
                    <Text bold>Ultimas recetas</Text>
                    <HStack space={4}>
                        <Box maxW="45%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
                            <Box>
                                <AspectRatio w="100%" ratio={16 / 9}>
                                    <Image source={{
                                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                                    }} alt="image" />
                                </AspectRatio>
                                <Center bg="violet.500" position="absolute" bottom="0" px="3" py="1.5">
                                    PHOTOS
                                </Center>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        The Garden City
                                    </Heading>
                                    <Text fontSize="xs" ml="-0.5" mt="-1">
                                        The Silicon Valley of India.
                                    </Text>
                                </Stack>
                                <Text fontWeight="400">
                                    Bengaluru (also called Bangalore) is the center of India's high-tech
                                    industry. The city is also known for its parks and nightlife.
                                </Text>
                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="center">
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }} fontWeight="400">
                                            6 mins ago
                                        </Text>
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                        <Box maxW="45%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
                            <Box>
                                <AspectRatio w="100%" ratio={16 / 9}>
                                    <Image source={{
                                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                                    }} alt="image" />
                                </AspectRatio>
                                <Center bg="violet.500" position="absolute" bottom="0" px="3" py="1.5">
                                    PHOTOS
                                </Center>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        The Garden City
                                    </Heading>
                                    <Text fontSize="xs" ml="-0.5" mt="-1">
                                        The Silicon Valley of India.
                                    </Text>
                                </Stack>
                                <Text fontWeight="400">
                                    Bengaluru (also called Bangalore) is the center of India's high-tech
                                    industry. The city is also known for its parks and nightlife.
                                </Text>
                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="center">
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }} fontWeight="400">
                                            6 mins ago
                                        </Text>
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                    </HStack>
                </VStack>
            </Box>
        </View >
    )
};

export default ({ props }) => {
    return (
        <NativeBaseProvider>
            <View minW={"100%"} maxH={"100%"}>
                <ScrollView>
                    <Profile />
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
};
