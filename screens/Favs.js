import React, { useState, useEffect } from 'react';
import {
    Box, Center, NativeBaseProvider, View, Avatar,
    Button, HStack, VStack, Text, AspectRatio, Stack, Heading, Image, ScrollView
} from 'native-base';
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Profile({ props }) {
    const [recetas, setRecetas] = useState([]);

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
            <Box ml={"9%"} w={"84%"}>
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
