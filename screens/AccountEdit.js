import React, { useState, useEffect } from 'react';
import {
    Box, Center, NativeBaseProvider, View, Avatar,
    Button, HStack, VStack, Text, AspectRatio, Stack, Heading, Image, ScrollView, FormControl, Input, TextArea
} from 'native-base';
import firebase from "../backend/Firebase";
import { collection, query, where, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';


function Profile({ props }) {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [tel, setTel] = useState();
    const [img, setImg] = useState();
    const [des, setDes] = useState();
    const getUser = async () => {
        const usuario = firebase.auth.currentUser;
        if (usuario) {
            // User is signed in, see docs for a list of available properties
            const uid = usuario.uid;
            const docRef = doc(firebase.db, "users", uid);
            try {
                // Pasa la referencia del documento a la función getDocs()
                const docSnapshot = await getDoc(docRef);
                // Verifica si el documento existe
                if (docSnapshot.exists()) {
                    // Agrega los datos del documento al array firebaseData
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
            } catch (errors) {
                // Muestra los errores en la consola
                console.log("Error getting document:", errors);
            }
        }
    };
    useEffect(() => {
        getUser();
    }, []);

    const saveUser = async (nombre, correo, celular, imagen, descripcion) => {
        try {
            const user = firebase.auth.currentUser;
            if (user) {
                const uid = user.uid;
                var userRef = doc(firebase.db, 'users', uid);
                await updateDoc(userRef, {
                    name: nombre,
                    email: correo,
                    tel: celular,
                    img: imagen,
                    desc: descripcion
                })
                    .then(() => {
                        console.log('Documento actualizado correctamente');
                    })
                    .catch((error) => {
                        console.error('Error al actualizar el documento:', error);
                    });
            }
            return true;
        } catch (errors) {
            console.error("Error adding document: ", errors);
            return false;
        }
    }

    const onSubmit = () => {
        saveUser(name, email, tel, img, des) ? navigation.navigate('Nav')
            : console.log("Validation Failed", errors, name, email, tel, img, des);
    };

    return (
        <View>
            <Box bg={"black"} rounded={"0px 10px 10px 0px"} pl={48} pr={48} pt={5}>
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
                    </VStack>
                    <VStack space={3}>
                        <Input defaultValue={name} onChangeText={(e) => setName(e.target.value)} bg={"white"} fontSize={"md"} fontStyle={'italic'} fontWeight={'bold'} mt={'-20%'} />
                        <HStack ml={"auto"} right={0} space={4} display={'absolute'}>
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
                    <Input value={img} onChangeText={(value) => setImg(value)} minW={"100%"} />
                    <Text bold>About</Text>
                    <TextArea defaultValue={des} onChangeText={(value) => setDes(value)} bg={"white"} minW={"100%"} />
                    <Text bold>Contact</Text>
                    <Text>Correo electronico</Text>
                    <Input defaultValue={email} onChangeText={(value) => setEmail(value)} bg={"white"} minW={"100%"} />
                    <Text>Numero telefonico</Text>
                    <Input defaultValue={tel} onChangeText={(value) => setTel(value)} bg={"white"} minW={"100%"} />
                    <Button size="sm" mt={4} onPress={onSubmit}>Guardar cambios</Button>
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
