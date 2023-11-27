import React, { useState, useEffect } from 'react';
import {
    Center,
    Input,
    View,
    VStack,
    HStack,
    Box,
    Text,
    Image,
    Select,
    FormControl,
    TextArea,
    Button
}
    from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from "../backend/Firebase";
import { collection, getDocs, doc, query, setDoc } from "firebase/firestore";
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage";

const FormReceta = (props) => {
    const [category, setCategory] = useState([]);

    const fireCategory = [];
    const getCategory = async () => {
        const q = query(collection(firebase.db, "category")); //, where("capital", "==", true));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                fireCategory.push(doc.data());
            });
            setCategory(fireCategory);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }
    useEffect(() => {
        getCategory();
    }, []);

    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const [img, setImg] = React.useState("https://i.postimg.cc/Kv8whn9r/dish.png");

    const route = useRoute();
    const { uid } = route.params;

    const onValidate = (name, description, ingredient, image, category, time, step, user) => {
        if (name == undefined) {
            setErrors({
                ...errors,
                name: "Ingrese un nombre"
            });
            return false;
        }
        if (description == undefined) {
            setErrors({
                ...errors,
                description: "Ingrese una descripcion"
            });
            return false;
        }
        if (ingredient == undefined) {
            setErrors({
                ...errors,
                ingredient: "Ingrese un ingrediente"
            });
            return false;
        } if (image == undefined) {
            setErrors({
                ...errors,
                img: "Ingrese una imagen"
            });
            return false;
        }
        if (category == undefined) {
            setErrors({
                ...errors,
                category: "Ingrese una categoria"
            });
            return false;
        }
        if (time == undefined) {
            setErrors({
                ...errors,
                time: "Ingrese el tiempo"
            });
            return false;
        }
        if (!/^[0-9]/.test(time)) {
            setErrors({
                ...errors,
                time: "Tiempo invalido"
            });
            return false;
        }
        if (step == undefined) {
            setErrors({
                ...errors,
                steps: "Ingrese un paso"
            });
            return false;
        }
        if (user == undefined) {
            setErrors({
                ...errors,
                uid: "No ha iniciado sesion"
            });
            return false;
        }
        saveRecipe(name, description, ingredient, image, category, time, step, user);
        return true;
    }

    const saveRecipe = async (name, desc, ingredient, image, category, time, step, userid) => {
        try {
            const data = {
                name: name,
                description: desc,
                ingredient: ingredient,
                steps: step,
                category: category,
                time: time,
                img: image,
                userid: userid
            }
            await setDoc(doc(firebase.db, 'recipes', name), data);
            alert("La receta se a registrado");
            return true;
        } catch (errors) {
            console.error("Error adding document: ", errors, tiempo);
            return false;
        }
    }

    const onSubmit = () => {
        onValidate(formData.name, formData.description, formData.ingredient, img, formData.category, formData.time, formData.steps, uid)
            ? navigation.navigate('Nav') : console.log("Validation Failed", errors);
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1],
        });

        if (!result.canceled) {
            const { uid } = route.params;
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
                alert("Upload failed, sorry :(");
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

    return <Center w={"90%"} ml={"5%"}>
        <Box w={"95%"} bg={"white"} rounded={'xl'} p={"5%"}>
            <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Nueva receta</Text>
            <HStack w={"95%"} space={2}>
                <TouchableOpacity>
                    <Pressable onPress={pickImageAsync}>
                        <Image source={{ uri: img }} alt="Txt" size="lg" style={{ width: '120px', marginTop: '15px' }} resizeMode="contain" />
                    </Pressable>
                </TouchableOpacity>
                <VStack space={1} w={'60%'}>
                    <FormControl isRequired isInvalid={'name' in errors}>
                        <FormControl.Label fontSize={'xs'} >Nombre:</FormControl.Label>
                        <Input size="xs" placeholder="Arroz con leche" onChangeText={value => setData({
                            ...formData,
                            name: value
                        })} bg={"white"} minW={"100%"} fontSize={"lg"} />
                        {'name' in errors ?
                            <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage> : " "
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={'category' in errors}>
                        <FormControl.Label fontSize={'xs'} >Categoria:</FormControl.Label>
                        <Select selectedValue={formData.category} placeholder="Elige una categoria" fontSize={'md'} _selectedItem={{
                            bg: "teal.600"
                        }} onValueChange={value => setData({
                            ...formData,
                            category: value
                        })}>
                            {category.map((category) => (
                                <Select.Item key={category.name} label={category.name} value={category.name} />
                            ))}
                        </Select>
                        {'category' in errors ?
                            <FormControl.ErrorMessage>{errors.category}</FormControl.ErrorMessage> : " "
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={'time' in errors}>
                        <FormControl.Label >Tiempo estimado:</FormControl.Label>
                        <Input size="xs" placeholder="min aprox" onChangeText={value => setData({
                            ...formData,
                            time: value
                        })} bg={"white"} minW={"100%"} fontSize={"lg"} />
                        {'time' in errors ?
                            <FormControl.ErrorMessage>{errors.time}</FormControl.ErrorMessage> : " "
                        }
                    </FormControl>
                </VStack>
            </HStack>
            <FormControl isRequired isInvalid={'description' in errors}>
                <FormControl.Label >Descripcion:</FormControl.Label>
                <TextArea placeholder="Postre a base de arroz y leche" onChangeText={value => setData({
                    ...formData,
                    description: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} >
                </TextArea>
                {'description' in errors ?
                    <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage> : " "
                }
            </FormControl>
            <FormControl isRequired isInvalid={'ingredient' in errors}>
                <FormControl.Label >Ingredientes:</FormControl.Label>
                <TextArea placeholder="-1Kg de arroz..." onChangeText={value => setData({
                    ...formData,
                    ingredient: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} >
                </TextArea>
                {'ingredient' in errors ?
                    <FormControl.ErrorMessage>{errors.ingredient}</FormControl.ErrorMessage> : " "
                }
            </FormControl>
            <FormControl isRequired isInvalid={'steps' in errors}>
                <FormControl.Label >Pasos:</FormControl.Label>
                <TextArea placeholder="1. Limpie el arroz..." onChangeText={value => setData({
                    ...formData,
                    steps: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} >
                </TextArea>
                {'steps' in errors ?
                    <FormControl.ErrorMessage>{errors.steps}</FormControl.ErrorMessage> : " "
                }
            </FormControl>

            <HStack mt={8} space={1}>
                <Button style={{ backgroundColor: "#483285", width: '50%' }} onPress={onSubmit} >Guardar</Button>
                <Button style={{ backgroundColor: "#cacaca", width: '50%' }}
                    onPress={() => navigation.goBack()}>Cancelar</Button>
            </HStack>
        </Box>
    </Center>;
}
export default function () {
    return (
        <View minH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <FormReceta />
        </View>
    );
};

