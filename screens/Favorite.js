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
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";

const Favorite = () => {
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
        getData();
    }, []);

    const delFavs = async (recipe) => {
        const user = firebase.auth.currentUser;
        const name = user.uid + '-' + recipe
        console.log(name);
        try {
            const recipesRef = doc(firebase.db, 'favorites', name)
            await deleteDoc(recipesRef);
            console.log('Document has been deleted');
            alert("Esta receta se a eliminado de tus favoritos");
        } catch (error) {
            console.log('Error deleting the document', error);
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

                {recipes.map(function (recipe) {
                    var ingredient = recipe.ingredient;
                    return ingredient.split(',').map((ingredients) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Checkbox colorScheme="purple" />
                                <Text fontSize={'md'}>{ingredients}</Text>
                            </View>);
                    });
                })}
                <Text style={{ fontSize: 'sm', color: 'rgb(115, 115, 115)' }}>Pasos:</Text>
                {recipes.map(function (recipe) {
                    var step = recipe.steps;
                    return step.split(',').map((steps, index) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <Favorite />
        </View>
    );
};
