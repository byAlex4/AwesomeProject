import React, { useState, useEffect } from 'react';
import {
    Center,
    Input,
    CheckIcon,
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
import * as ImagePicker from "expo-image-picker";
import firebase from "../backend/Firebase";
import { collection, getDocs, doc, query, setDoc } from "firebase/firestore";

// Exportar el componente CrearReceta
const CrearReceta = (props) => {
    const [categorias, setCategorias] = useState([]);
    const fireCategory = [];
    const getCategory = async () => {
        const q = query(collection(firebase.db, "category")); //, where("capital", "==", true));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                fireCategory.push(doc.data());
            });
            setCategorias(fireCategory);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }

    useEffect(() => {
        getCategory();
    }, []);

    const saveRecipe = async (nombre, descripcion, ingredientes, imagen, categoria, tiempo, pasos, userid) => {
        try {
            const data = {
                name: nombre,
                description: descripcion,
                ingredient: ingredientes,
                steps: pasos,
                category: categoria,
                time: tiempo,
                img: imagen,
                userid: userid
            }
            await setDoc(doc(firebase.db, 'recipes', nombre), data);
            return true;
        } catch (errors) {
            console.error("Error adding document: ", errors);
            return false;
        }
    }

    // Añadir async a la función pickImage
    const pickImage = async () => {
        // Pedir permiso al usuario para acceder a sus fotos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Lo siento, necesitamos permiso para acceder a tus fotos.');
            return;
        }

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const navigation = useNavigation();
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});

    const route = useRoute();
    const { uid } = route.params;
    const onSubmit = () => {
        saveRecipe(formData.name, formData.description, formData.ingredient, formData.img, formData.category, formData.time, formData.steps, uid)
            ? navigation.navigate('Nav') : console.log("Validation Failed", errors, uid, formData.name, formData.description, formData.category);
    };

    return <Center w={"90%"} ml={"5%"}>
        <Box w={"95%"} bg={"white"} rounded={'xl'} p={"5%"}>
            <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Nueva receta</Text>
            <HStack w={"95%"} space={2}>
                <TouchableOpacity>
                    <Image source={{
                        uri: "https://i.postimg.cc/VLQdNJPY/default-user-icon-4.jpg"
                    }} alt="Txt" size="lg" style={{ width: '120px', marginTop: '15px' }} resizeMode="contain"
                        onPress={() => pickImage} />
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
                    <FormControl>
                        <FormControl.Label fontSize={'xs'} isRequired isInvalid={'category' in errors}>Categoria:</FormControl.Label>
                        <Select selectedValue={formData} accessibilityLabel="Choose Service" placeholder="Elige una categoria" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} ml={1} onValueChange={value => setData({
                            ...formData,
                            category: value
                        })}>
                            {categorias.map((category) => (
                                <Select.Item key={category.name} label={category.name} value={category.name} />
                            ))}
                        </Select>
                        {'category' in errors ?
                            <FormControl.ErrorMessage>{errors.category}</FormControl.ErrorMessage> : " "
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={'time' in errors}>
                        <FormControl.Label >Tiempo estimado:</FormControl.Label>
                        <Input size="xs" placeholder="30 min aprox" onChangeText={value => setData({
                            ...formData,
                            time: value
                        })} bg={"white"} minW={"100%"} fontSize={"lg"} />
                        {'time' in errors ?
                            <FormControl.ErrorMessage>{errors.time}</FormControl.ErrorMessage> : " "
                        }
                    </FormControl>
                    <FormControl isRequired isInvalid={'img' in errors}>
                        <FormControl.Label >imagen:</FormControl.Label>
                        <Input size="xs" placeholder="30 min aprox" onChangeText={value => setData({
                            ...formData,
                            img: value
                        })} bg={"white"} minW={"100%"} fontSize={"lg"} />
                        {'img' in errors ?
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
                    {'time' in errors ?
                        <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage> : " "
                    }
                </TextArea>
            </FormControl>
            <FormControl isRequired isInvalid={'ingredient' in errors}>
                <FormControl.Label >Ingredientes:</FormControl.Label>
                <TextArea placeholder="-1Kg de arroz..." onChangeText={value => setData({
                    ...formData,
                    ingredient: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} >
                    {'time' in errors ?
                        <FormControl.ErrorMessage>{errors.ingredient}</FormControl.ErrorMessage> : " "
                    }
                </TextArea>
            </FormControl>
            <FormControl isRequired isInvalid={'steps' in errors}>
                <FormControl.Label >Pasos:</FormControl.Label>
                <TextArea placeholder="1. Limpie el arroz..." onChangeText={value => setData({
                    ...formData,
                    steps: value
                })} bg={"white"} minW={"100%"} fontSize={"lg"} >
                    {'time' in errors ?
                        <FormControl.ErrorMessage>{errors.steps}</FormControl.ErrorMessage> : " "
                    }</TextArea>
            </FormControl>

            <HStack mt={8} space={1}>
                <Button style={{ backgroundColor: "#483285", width: '50%' }} onPress={onSubmit} >Gurdar</Button>
                <Button style={{ backgroundColor: "#cacaca", width: '50%' }}
                    onPress={() => navigation.goBack()}>Cancelar</Button>
            </HStack>
        </Box>
    </Center>;
}

export default function () {
    return (
        <View minH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <CrearReceta />
        </View>
    );
};
