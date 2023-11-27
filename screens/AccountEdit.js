import React, { useState, useEffect } from 'react';
import {
    Box,
    NativeBaseProvider,
    View,
    Avatar,
    Button,
    HStack,
    VStack,
    Text,
    ScrollView,
    Input,
    TextArea,
    FormControl
} from 'native-base';
import firebase from "../backend/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage";
import { Pressable } from 'react-native';

function EditProfile({ props }) {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [img, setImg] = useState("https://i.postimg.cc/VLQdNJPY/default-user-icon-4.jpg");
    const [des, setDes] = useState();
    const [errors, setErrors] = useState({});
    const getUser = async () => {
        const user = firebase.auth.currentUser;
        if (user) {
            const uid = user.uid;
            const docRef = doc(firebase.db, "users", uid);
            try {
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data()
                    setName(data.name);
                    setEmail(data.email);
                    setPhone(data.phone);
                    setImg(data.img);
                    setDes(data.desc);
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

    const saveUser = async () => {
        const user = firebase.auth.currentUser;
        if (user) {
            const uid = user.uid;
            var userRef = doc(firebase.db, 'users', uid);
            await updateDoc(userRef, {
                name: name,
                email: email,
                phone: phone,
                img: img,
                desc: des
            })
                .then(() => {
                    console.log('Document has been updated');
                    return true;
                })
                .catch((errors) => {
                    console.error('Error updating the document:', errors);
                    return false;
                });
        }
    }

    const onValidate = () => {
        if (name == "") {
            setErrors({
                ...errors,
                name: "Ingrese un nombre"
            });
            return false;
        }
        if (email == "") {
            setErrors({
                ...errors,
                email: "Ingrese un correo"
            });
            return false;
        }
        if (phone == "") {
            setErrors({
                ...errors,
                phone: "Ingrese un telefono"
            });
            return false;
        } if (img == "") {
            setErrors({
                ...errors,
                img: "Ingrese una imagen"
            });
            return false;
        }
        if (des == "") {
            setErrors({
                ...errors,
                desc: "Ingrese una descripcion"
            });
            return false;
        }
        saveUser();
        return true;
    }

    const onSubmit = () => {
        onValidate() ? navigation.navigate('Nav') : console.log("Error adding document", errors);
    };

    const pickImageAsync = async () => {
        const user = firebase.auth.currentUser;
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1],
        });

        if (!result.canceled) {
            const uid = user.email;
            const assets = result.assets[0];
            const storage = getStorage();
            const name = "img" + uid + Date.now();
            console.log(name);
            const imagesRef = ref(storage, name);
            try {
                uploadString(imagesRef, assets.uri, 'data_url').then((snapshots) => {
                    console.log('Uploaded a data_url string!');
                });
                setTimeout(getURL, 3000, imagesRef);
            } catch (e) {
                console.log(e);
                alert("Upload failed, try again later");
            }
        } else {
            alert('You did not select any image.');
        }
    };

    const getURL = (imagesRef) => {
        getDownloadURL(imagesRef)
            .then(function (url) {
                setImg(url);
            }).catch(function (error) {
                console.error(error);
            });
    }

    return (
        <View>
            <Box bg={"black"} rounded={"0px 10px 10px 0px"} pl={'40%'} pr={'40%'} pt={'20%'}>
                This is a Box with Linear Gradient
            </Box>
            <Box ml={"9%"} w={"84%"}>

                <HStack space={3}>
                    <VStack>
                        <Pressable onPress={pickImageAsync}>
                            <Avatar bg="amber.500" source={{
                                uri: img
                            }} size="2xl" mt={"-45%"}>
                                <Avatar.Badge bg="green.500" />
                            </Avatar>
                        </Pressable>
                    </VStack>
                    <FormControl isRequired isInvalid={'name' in errors}>
                        <Input value={name} onChangeText={value => setName(value)} bg={"white"}
                            fontSize={"lg"} fontWeight={'bold'} maxH={'40px'} mt={1} />
                        {'name' in errors ?
                            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> : ""
                        }
                    </FormControl>
                </HStack>
                <VStack mt={5}>
                    <FormControl isRequired isInvalid={'desc' in errors}>
                        <FormControl.Label bold>Descripción</FormControl.Label>
                        <TextArea value={des} onChangeText={value => setDes(value)} bg={"white"}
                            minW={"100%"} fontSize={"md"} />
                        {'desc' in errors ?
                            <FormControl.ErrorMessage>{errors.desc}</FormControl.ErrorMessage> : ""
                        }
                    </FormControl>
                    <Text bold>Contacto</Text>
                    <FormControl isRequired isInvalid={'email' in errors}>
                        <FormControl.Label bold>Correo electronico</FormControl.Label>
                        <Input value={email} onChangeText={value => setEmail(value)} bg={"white"} minW={"100%"} fontSize={"md"} />
                        {'email' in errors ?
                            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage> : ""
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={'phone' in errors}>
                        <FormControl.Label bold>Numero telefonico</FormControl.Label>
                        <Input value={phone} onChangeText={value => setPhone(value)} bg={"white"} minW={"100%"} fontSize={"md"} />
                        {'phone' in errors ?
                            <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : ""
                        }
                    </FormControl>
                    <Button size="sm" mt={4} onPress={onSubmit} colorScheme={'indigo'}>Guardar cambios</Button>
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
                    <EditProfile />
                </ScrollView>
            </View>
        </NativeBaseProvider>
    );
};