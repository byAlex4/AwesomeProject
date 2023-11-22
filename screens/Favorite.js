import React, { useState, useEffect } from 'react';
import {
    Center,
    View,
    VStack,
    HStack,
    Box,
    Text,
    Image,
    IconButton,
    Checkbox
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { CheckBox } from 'react-native-web';

// Exportar el componente CrearReceta
const Receta = () => {
    const route = useRoute();
    const [receta, setReceta] = useState([]);

    // Obtiene el firebaseId del parámetro de navegación
    const { recipeId } = route.params;

    const firebaseData = [];
    const getDatos = async () => {
        const q = query(collection(firebase.db, "recipes"), where("name", "==", recipeId));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                firebaseData.push(doc.data());
            });
            setReceta(firebaseData);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }

    const pasosArray = [];
    useEffect(() => {
        getDatos();// Llama a la función getDatos
    }, []);

    const [checked, setChecked] = useState([]);
    // definir la función handleChange que recibe el índice del checkbox
    const handleChange = (index) => {
        // copiar el arreglo de estado actual
        let newChecked = [...checked];
        // invertir el valor del elemento según el índice
        newChecked[index] = !newChecked[index];
        // actualizar el estado con el nuevo arreglo
        setChecked(newChecked);
    }

    const delFavs = async (name) => {
        const user = firebase.auth.currentUser;
        const uid = user.uid;
        // Crear una referencia a la colección de recetas 
        const recipesRef = collection(firebase.db, 'favorites')
        // Crear una consulta para filtrar los documentos donde recipeID = name y userID = uid 
        const query = query(recipesRef, where('idrecipe', '==', name), where('iduser', '==', uid));
        // Obtener los documentos que coinciden con la consulta 
        const querySnapshot = await getDocs(query);
        // Iterar sobre los documentos y borrarlos 
        querySnapshot.forEach(async (doc) => {
            // Borrar el documento 
            await deleteDoc(doc.ref);
            console.log('Documento borrado correctamente');
        });
    }


    return <Center w={"90%"} ml={"5%"}>
        <Box w={"95%"} bg={"white"} rounded={'xl'} p={"5%"}>
            <VStack space={2}>
                {receta.map((recipe) => (
                    <>
                        <HStack>
                            <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>{recipe.name}</Text>
                            <IconButton colorScheme="indigo" variant={'outline'} ml={'auto'} mr={0} _icon={{
                                as: AntDesign,
                                name: "heart"
                            }} onPress={() => delFavs(recipe.name)} />
                        </HStack>
                        <HStack w={"95%"} space={2}>
                            <Image source={{
                                uri: recipe.img
                            }} alt="Txt" size="lg" style={{ width: '45%', marginTop: '15px' }} resizeMode="contain"
                                onPress={() => pickImage} />
                            <VStack space={1} w={'60%'}>
                                <Text style={{ fontSize: '20px', color: 'rgb(115, 115, 115)' }}>Categoria:</Text>
                                <Text fontSize={'md'}>{recipe.category}</Text>
                                <Text style={{ fontSize: '20px', color: 'rgb(115, 115, 115)' }}>Tiempo:</Text>
                                <Text fontSize={'md'}>{recipe.time}</Text>
                            </VStack>
                        </HStack>
                        <Text style={{ fontSize: '20px', color: 'rgb(115, 115, 115)' }}>Descripcion:</Text>
                        <Text fontSize={'md'}>{recipe.description}</Text>
                    </>
                ))}
                <Text style={{ fontSize: '20px', color: 'rgb(115, 115, 115)' }}>Ingredientes:</Text>

                {receta.map(function (recipes) {
                    var ingredientes = recipes.ingredient; // Aquí asignas el valor de la categoría a una variable 
                    return ingredientes.split(',').map((ingrediente) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <CheckBox colorScheme="purple" />
                                <Text fontSize={'md'}>{ingrediente}</Text>
                            </View>);
                    });
                })}

                <Text style={{ fontSize: 'sm', color: 'rgb(115, 115, 115)' }}>Pasos:</Text>
                <Checkbox.Group>
                    {receta.map(function (recipes) {
                        var pasos = recipes.steps; // Aquí asignas el valor de la categoría a una variable 
                        return pasos.split(',').map((paso, index) => {
                            return (
                                <View>
                                    <Checkbox colorScheme="purple" value="test"
                                        onChange={() => handleChange(index)} // llamar a una función que actualice el estado
                                        isChecked={checked[index]} // usar el valor del arreglo según el índice
                                    >
                                        <Text fontSize={'md'}>{paso}</Text>
                                    </Checkbox >
                                </View>);
                        });
                    })}
                </Checkbox.Group>
            </VStack>
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
