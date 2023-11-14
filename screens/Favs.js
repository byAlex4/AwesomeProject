import React, { useState, useEffect } from 'react';
import {
    Box, NativeBaseProvider, View, HStack, VStack, Text,
    Pressable, Image, ScrollView
} from 'native-base';
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

function Favorites({ props }) {
    const [receta, setReceta] = useState([]);
    const [favorito, setFavorito] = useState([]);

    const firebaseData = [];
    const firebaseFav = [];

    const getDatos = async () => {
        const user = firebase.auth.currentUser;
        if (user) {
            // User is signed in, see docs for a list of available properties
            const uid = user.uid;
            console.log('accont', uid);
            const q1 = query(collection(firebase.db, "favorites"), where("iduser", "==", uid));
            try {
                const querySnapshot = await getDocs(q1);
                querySnapshot.forEach(async (doc) => {
                    const idrecipe = doc.data().idrecipe;
                    console.log("id de receta favorita:", idrecipe);
                    const q2 = query(collection(firebase.db, "recipes"), where("name", "==", idrecipe));
                    const querySnap = await getDocs(q2);
                    querySnap.forEach((doc) => {
                        const data2 = doc.data();
                        firebaseFav.push(data2);
                    });
                    console.log(firebaseFav);
                    setReceta(firebaseFav)
                });
            } catch (errors) {
                console.log("No such fav!", errors);
            };
        };
    }
    useEffect(() => {
        getDatos();// Llama a la función getDatos
        console.log(receta);
    }, []); // Pasa un arreglo vacío como segundo argumento para que solo se ejecute una vez

    const navigation = useNavigation();
    const navRecipe = (recipeId) => {
        // Navega a la pantalla donde quieres mostrar los productos
        // y pasa el firebaseId como un parámetro
        navigation.navigate("Receta", { recipeId });
    };

    return (
        <Box w={"90%"} bg={"white"} rounded={'xl'} m={"5%"} minH={'90%'}>
            <VStack m={"5%"} w={"90%"} space={5}>
                <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Favoritos</Text>
                {receta.map((recipes, index) => (
                    <Pressable onPress={() => navRecipe(recipes.name)}>
                        <Box w={"100%"}>
                            <HStack space={4}>
                                <Image key={index} source={{
                                    uri: recipes.img
                                }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 125, height: 125 }}  ></Image>
                                <VStack flexWrap={'wrap'} maxW={'148px'}>
                                    <Text>{recipes.name}</Text>
                                    <Text>Categoria: {recipes.category}</Text>
                                    <Text>Tiempo: {recipes.time}</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    </Pressable>
                ))}
            </VStack>
        </Box>
    )
};

export default () => {
    return (
        <ScrollView flex={1} minH={'100%'} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Favorites />
        </ScrollView>
    );
};
