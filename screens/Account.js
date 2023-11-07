import React, { useState, useEffect } from 'react';
import {
    Box, Center, NativeBaseProvider, View, Avatar,
    Button, HStack, VStack, Text, AspectRatio, Stack, Heading, Image, ScrollView
} from 'native-base';
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Profile({ route }) {
    const [recetas, setRecetas] = useState([]);
    //const { uid } = route.params || {};
    //console.log(uid);

    const firebaseData = [];
    const getDatos = async () => {
        const q = query(collection(firebase.db, "recipes"));//, where("category", "==", 'Desayunos'));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                firebaseData.push(doc.data());
            });
            setRecetas(firebaseData);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }
    useEffect(() => {
        getDatos();// Llama a la función getDatos
    }, []); // Pasa un arreglo vacío como segundo argumento para que solo se ejecute una vez
    return (
        <View>
            <Box bg={"black"} rounded={"0px 10px 10px 0px"} pl={48} pr={48} pt={20}>
                This is a Box with Linear Gradient
            </Box>
            <Box ml={"9%"} w={"84%"}>
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
                    <HStack space={4} flexWrap={'wrap'}>
                        {recetas.map((recipes) => (
                            <>
                                <Box w="45%" h='45%' mb={3} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1">
                                    <Box>
                                        <AspectRatio minW="100%" ratio={16 / 9}>
                                            <Image source={{
                                                uri: recipes.img
                                            }} alt="image" />
                                        </AspectRatio>
                                        <Center bg="violet.500" position="absolute" bottom="0" px="3" py="1.5">
                                            Novedad
                                        </Center>
                                    </Box>
                                    <Stack p="4" space={3}>
                                        <Heading size="md" ml="-1">
                                            {recipes.name}
                                        </Heading>
                                        <Text fontWeight="400">
                                            {recipes.time}
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
                            </>
                        ))}
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
