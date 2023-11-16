import React, { useState, useEffect } from 'react';
import {
    Center,
    View,
    VStack,
    HStack,
    Box,
    Text,
    Image,
    Select,
    TextArea,
    Button,
    Input,
    CheckIcon,
    IconButton,
    AlertDialog
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage";


// Exportar el componente CrearReceta
const Receta = () => {
    const route = useRoute();
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [category, setCategory] = useState();
    const [desc, setDesc] = useState();
    const [ingredient, setIngredient] = useState();
    const [steps, setSteps] = useState();
    const [time, setTime] = useState();
    const [errors, setErrors] = React.useState({});

    // Obtiene el firebaseId del parámetro de navegación
    const { recipeId } = route.params;
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

    const getDatos = async () => {
        const q = query(collection(firebase.db, "recipes"), where("name", "==", recipeId));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(data);
                setName(data.name);
                setImg(data.img);
                setCategory(data.category);
                setDesc(data.description);
                setIngredient(data.ingredient);
                setSteps(data.steps);
                setTime(data.time);
            });
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }

    useEffect(() => {
        getDatos();// Llama a la función getDatos
        getCategory();
    }, []);

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
                // Aquí usamos setTimeout para retrasar la llamada a getURL por 2000 milisegundos (2 segundos)
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
                console.log(url);
                setImg(url);
                console.log(img);
            }).catch(function (error) {
                // Maneja cualquier error
                console.error(error);
            });
    }

    const saveRecipe = async (nombre, descripcion, ingredientes, imagen, categoria, tiempo, pasos) => {
        const usuario = firebase.auth.currentUser;
        if (usuario) {
            const uid = usuario.uid;
            try {
                var recipeRef = doc(firebase.db, 'recipes', nombre);
                await updateDoc(recipeRef, {
                    name: nombre,
                    description: descripcion,
                    img: imagen,
                    category: categoria,
                    time: tiempo,
                    ingredient: ingredientes,
                    steps: pasos,
                    userid: uid
                })
                    .then(() => {
                        console.log('Documento actualizado correctamente');
                        return true;
                    })
                    .catch((error) => {
                        console.error('Error al actualizar el documento:', error);
                        return false;
                    });
            } catch (errors) {
                console.error("Error adding document: ", errors);
                return false;
            }
        }
    }

    const navigation = useNavigation();
    const onSubmit = () => {
        saveRecipe(name, desc, ingredient, img, category, time, steps)
            ? navigation.navigate('Nav') : console.log("Validation Failed", errors, name, description, category);
    };

    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    const deleteRecipe = async (name) => {
        // Crear una referencia al documento que quieres borrar
        const recipeRef = doc(firebase.db, 'recipes', name);
        // Intentar borrar el documento y manejar los posibles errores
        try {
            await deleteDoc(recipeRef);
            console.log('Documento borrado correctamente');
        } catch (error) {
            console.error('Error al borrar el documento:', error);
        }
    };

    return <Center w={"90%"} ml={"5%"}>
        <Box w={"95%"} bg={"white"} rounded={'xl'} p={"5%"}>
            <HStack>
                <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Editar receta</Text>
                <IconButton colorScheme="indigo" variant={'outline'} ml={'auto'} mr={0} _icon={{
                    as: AntDesign,
                    name: "delete"
                }} onPress={() => setIsOpen(!isOpen)} />
            </HStack>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Eliminar {name}</AlertDialog.Header>
                    <AlertDialog.Body>
                        Esto podria eliminar la receta permanentemente.
                        Esta accion no se podra revertir.
                        Los datos eliminados no se podran recuperar.
                        Estas seguro de querer eliminarla?
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                Cancelar
                            </Button>
                            <Button colorScheme="danger" onPress={() => deleteRecipe(name)}>
                                Eliminar
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <HStack w={"95%"} space={2}>
                <TouchableOpacity>
                    <Pressable onPress={pickImageAsync}>
                        <Image source={{ uri: img }} alt="Txt" size="lg" style={{ width: '120px', marginTop: '15px' }} resizeMode="contain" />
                    </Pressable>
                </TouchableOpacity>
                <VStack space={1} w={'60%'}>
                    <Text bold fontSize={'xs'} >Nombre:</Text>
                    <Input size="xs" defaultValue={name} onChangeText={(value) => setName(value)}
                        bg={"white"} minW={"100%"} fontSize={"lg"} />

                    <Text bold fontSize={'xs'} isRequired isInvalid={'category' in errors}>Categoria:</Text>
                    <Select selectedValue={category} accessibilityLabel="Choose Service" defaultValue={category}
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} ml={1} onValueChange={(value) => setCategory(value)}>
                        {categorias.map((category) => (
                            <Select.Item key={category.name} label={category.name} value={category.name} />
                        ))}
                    </Select>

                    <Text bold >Tiempo estimado:</Text>
                    <Input size="xs" defaultValue={time} onChangeText={(value) => setTime(value)} bg={"white"} minW={"100%"} fontSize={"lg"} />
                </VStack>
            </HStack>
            <Text bold >Descripcion:</Text>
            <TextArea value={desc} onChangeText={(value) => setDesc(value)} bg={"white"} minW={"100%"} fontSize={"lg"} >
            </TextArea>

            <Text bold >Ingredientes:</Text>
            <TextArea value={ingredient} onChangeText={(value) => setIngredient(value)} bg={"white"} minW={"100%"} fontSize={"lg"} >
            </TextArea>

            <Text bold >Pasos:</Text>
            <TextArea value={steps} onChangeText={(value) => setSteps(value)} bg={"white"} minW={"100%"} fontSize={"lg"} >
            </TextArea>
            <HStack mt={8} space={1}>
                <Button style={{ backgroundColor: "#483285", width: '50%' }} onPress={onSubmit} >Gurdar</Button>
                <Button style={{ backgroundColor: "#cacaca", width: '50%' }}
                    onPress={() => navigation.goBack()}>Cancelar</Button>
            </HStack>
        </Box>
    </Center >; ''
}

export default function () {
    return (
        <View minH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Receta />
        </View>
    );
};
