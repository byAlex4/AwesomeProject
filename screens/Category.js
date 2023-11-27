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
import { Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Category({ props }) {
    const navigation = useNavigation();
    const route = useRoute();
    const [recipe, setRecipe] = useState([]);
    const { categoryId } = route.params;

    const firebaseData = [];
    const getData = async () => {
        const q = query(collection(firebase.db, "recipes"), where("category", "==", categoryId));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                firebaseData.push(doc.data());
            });
            setRecipe(firebaseData);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    const navRecipe = (recipeId) => {
        navigation.navigate("Receta", { recipeId });
    };

    return (
        <Center w={"80%"} ml={"10%"}>
            <Box w={"100%"} bg={"white"} rounded={'xl'} m={"5%"}>
                <VStack m={"5%"} w={"90%"} space={5}>
                    {recipe.map((recipes) => (
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
            <Category />
        </View>
    );
};
