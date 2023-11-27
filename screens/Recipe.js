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
    Checkbox,
    Alert,
    CloseIcon
} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";

const Recipe = () => {
    const route = useRoute();
    const [recipes, setRecipes] = useState([]);
    const { recipeId } = route.params;

    const firebaseData = [];
    const getData = async () => {
        const q = query(collection(firebase.db, "recipes"), where("name", "==", recipeId));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                firebaseData.push(doc.data());
            });
            setRecipes(firebaseData);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }

    useEffect(() => {
        getData();// Llama a la función getDatos
    }, []);

    const [checked, setChecked] = useState([]);
    const handleChange = (index) => {
        let newChecked = [...checked];
        newChecked[index] = !newChecked[index];
        setChecked(newChecked);
    }

    const addFavs = async (recipe) => {
        const user = firebase.auth.currentUser;
        try {
            const uid = user.uid;
            const data = {
                idrecipe: recipe,
                iduser: uid,
            }
            const name = uid + '-' + recipe;
            await setDoc(doc(firebase.db, 'favorites', name), data);
            alert("Esta receta se agrego a tus favoritos");
        } catch (errors) {
            console.error("Error adding document: ", errors);
        }
    }
    return <Center w={"90%"} ml={"5%"}>
        <Box w={"95%"} bg={"white"} rounded={'xl'} p={"5%"}>
            <VStack space={2}>
                {recipes.map((recipe) => (
                    <>
                        <HStack>
                            <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>{recipe.name}</Text>
                            <IconButton colorScheme="indigo" variant={'outline'} ml={'auto'} mr={0} _icon={{
                                as: AntDesign,
                                name: "hearto"
                            }} onPress={() => addFavs(recipe.name)} />
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
                                <Text fontSize={'md'}>{recipe.time} min</Text>
                            </VStack>
                        </HStack>
                        <Text style={{ fontSize: '20px', color: 'rgb(115, 115, 115)' }}>Descripcion:</Text>
                        <Text fontSize={'md'}>{recipe.description}</Text>
                    </>
                ))}
                <Text style={{ fontSize: '20px', color: 'rgb(115, 115, 115)' }}>Ingredientes:</Text>
                {recipes.map(function (recipe) {
                    var ingredient = recipe.ingredient;
                    return ingredient.split(',').map((ingrediente) => {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox colorScheme="purple" />
                                <Text fontSize={'md'}>{ingrediente}</Text>
                            </View>);
                    });
                })}
                <Text style={{ fontSize: 'sm', color: 'rgb(115, 115, 115)' }}>Pasos:</Text>
                {recipes.map(function (recipe) {
                    var step = recipe.steps;
                    return step.split(',').map((steps) => {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <Checkbox colorScheme="purple" />
                                <Text fontSize={'md'}>{steps}</Text>
                            </View>);
                    });
                })}
            </VStack>
        </Box>
    </Center >;
}

export default function () {
    return (
        <View minH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Recipe />
        </View>
    );
};
