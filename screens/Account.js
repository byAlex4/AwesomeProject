import React, { useState, useEffect } from 'react';
import {
    Box, Center, NativeBaseProvider, View, Avatar,
    Button, HStack, VStack, Text, AspectRatio, Stack, Heading, Image, ScrollView
} from 'native-base';
import firebase from "../backend/Firebase";
import { collection, query, where, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';


function Profile({ props }) {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [tel, setTel] = useState();
    const [img, setImg] = useState();
    const [des, setDes] = useState();

    const getUser = async () => {
        const user = firebase.auth.currentUser;
        if (user) {
            const uid = user.uid;
            const docRef = doc(firebase.db, "users", uid);
            try {
                const unsub = onSnapshot(docRef, (docSnapshot) => {
                    // Verifica si el documento existe
                    if (docSnapshot.exists()) {
                        const data = docSnapshot.data()
                        setName(data.name);
                        setEmail(data.email);
                        setTel(data.tel);
                        setImg(data.img);
                        setDes(data.desc);
                        console.log(data.name);
                    } else {
                        // Muestra un mensaje si el documento no existe
                        console.log("No such document!");
                    }
                });
            } catch (errors) {
                console.log('Error getting document:', errors);
            }
        }
    };

    const [recetas, setRecetas] = useState([]);
    const getDatos = async () => {
        const user = firebase.auth.currentUser;
        if (user) {
            // User is signed in, see docs for a list of available properties
            const uid = user.uid;
            const q = query(collection(firebase.db, "recipes"), where("userid", "==", uid));
            try {
                const unsub = onSnapshot(q, (querySnapshot) => {
                    // Crea un array vacío para almacenar los datos de los documentos
                    const fireRecipe = [];
                    querySnapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            // Agrega los datos del documento nuevo al array 
                            fireRecipe.push(change.doc.data());
                        } if (change.type === 'modified') {
                            // Actualiza los datos del documento modificado en el array 
                            fireRecipe[change.oldIndex] = change.doc.data();
                        } if (change.type === 'removed') { // Elimina los datos del documento eliminado del array 
                            fireRecipe.splice(change.oldIndex, 1);
                        }
                    });
                    setRecetas(fireRecipe);
                });
            } catch (errors) {
                console.log("No such document!", errors);
            };
        };
    };

    const handelSummit = () => {
        const user = firebase.auth.currentUser;
        if (user) {
            // User is signed in, see docs for a list of available properties
            const uid = user.uid;
            navigation.navigate("Editar cuenta", uid);
        };
    }

    const navRecipe = (recipeId) => {
        // Navega a la pantalla donde quieres mostrar los productos
        // y pasa el firebaseId como un parámetro
        navigation.navigate("Editar receta", { recipeId });
    };

    useEffect(() => {
        getDatos();
        getUser();
    }, []); // Pasa un arreglo vacío como segundo argumento para que solo se ejecute una vez
    return (
        <View>
            <Box bg={"black"} rounded={"0px 10px 10px 0px"} pl={48} pr={48} pt={20}>
                This is a Box with Linear Gradient
            </Box>
            <Box ml={"9%"} w={"84%"}>
                <HStack space={4}>
                    <VStack>
                        <Avatar bg="amber.500" source={{
                            uri: img
                        }} size="2xl" mt={"-65%"}>
                            <Avatar.Badge bg="green.500" />
                        </Avatar>
                        <Button size="sm" variant="outline" mt={4} onPress={handelSummit}>Editar perfil</Button>
                    </VStack>
                    <VStack space={3}>
                        <Text fontSize={"2xl"} fontStyle={'italic'}
                            color={'white'} fontWeight={'bold'} mt={'-20%'}>{name}</Text>
                        <HStack space={4}>
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
                    </VStack>
                </HStack>

                <VStack mt={5}>
                    <Text bold>About</Text>
                    <Text>{des} </Text>
                    <Text bold>Contact</Text>
                    <Text>{email} </Text>
                    <Text>{tel} </Text>
                </VStack>
                <VStack mt={5} space={4}>
                    <Text bold>Ultimas recetas</Text>
                    <HStack space={4} flexWrap={'wrap'}>
                        {recetas.map((recipes) => (
                            <>
                                <Pressable w="45%" mb={3} onPress={() => navRecipe(recipes.name)} >
                                    <Box rounded="lg" borderColor="coolGray.200" borderWidth="1">
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
                                </Pressable>
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
