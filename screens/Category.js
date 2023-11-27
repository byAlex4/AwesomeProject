import React, { useEffect, useState } from 'react';
import {
    Center,
    View,
    VStack,
    Box,
    HStack,
    Text,
    Image
}
    from 'native-base';
import { Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Categorias({ props }) {
    const navigation = useNavigation();
    const route = useRoute();
    const [recetas, setRecetas] = useState([]);

    // Obtiene el firebaseId del parámetro de navegación
    const { categoryId } = route.params;

    const firebaseData = [];
    const getDatos = async () => {
        const q = query(collection(firebase.db, "recipes"), where("category", "==", categoryId));
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

    const navRecipe = (recipeId) => {
        // Navega a la pantalla donde quieres mostrar los productos
        // y pasa el firebaseId como un parámetro
        navigation.navigate("Receta", { recipeId });
    };

    return (
        <Center w={"80%"} ml={"10%"}>
            <Box w={"100%"} bg={"white"} rounded={'xl'} m={"5%"}>
                <VStack m={"5%"} w={"90%"} space={5}>
                    {recetas.map((recipes) => (
                        <>
                            <Pressable onPress={() => navRecipe(recipes.name)}>
                                <Box w={"100%"}>
                                    <HStack space={4}>
                                        <Image source={{
                                            uri: recipes.img
                                        }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 125, height: 125 }}  ></Image>
                                        <VStack flexWrap={'wrap'} maxW={'148px'}>
                                            <Text>{recipes.name}</Text>
                                            <Text>{recipes.time} min</Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            </Pressable>
                        </>
                    ))}
                </VStack>
            </Box>
        </Center>
    );
}

export default function ({ props }) {
    return (
        <View minH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Categorias />
        </View>
    );
};
