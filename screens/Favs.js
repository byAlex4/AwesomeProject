import React, { useState, useEffect } from 'react';
import {
    Box,
    HStack,
    VStack,
    Text,
    Pressable,
    Image,
    ScrollView,
    Center,
    View
} from 'native-base';
import firebase from "../backend/Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

function Favorites({ props }) {
    const [recipe, setRecipe] = useState([]);
    const getData = async () => {
        const user = firebase.auth.currentUser;
        if (user) {
            const uid = user.uid;
            const q1 = query(collection(firebase.db, "favorites"), where("iduser", "==", uid));
            try {
                const unsub1 = onSnapshot(q1, async (querySnapshot) => {
                    for (const change of querySnapshot.docChanges()) {
                        const idrecipe = change.doc.data().idrecipe;
                        const q2 = query(collection(firebase.db, 'recipes'), where('name', '==', idrecipe));
                        const unsub2 = onSnapshot(q2, (querySnap) => {
                            querySnap.forEach((doc) => {
                                if (change.type === 'added') {
                                    console.log('favs has been added');
                                    setRecipe(prevRecipes => [...prevRecipes, doc.data()]);
                                } else if (change.type === 'modified') {
                                    console.log('favs has been modifed');
                                    setRecipe(prevRecipes => prevRecipes.map(recipe => recipe.name === idrecipe ? doc.data() : recipe));
                                } else if (change.type === 'removed') {
                                    console.log('favs has been remoded');
                                    setRecipe(prevRecipes => prevRecipes.filter(recipe => recipe.name !== idrecipe));
                                }
                            });
                        });
                    };
                })
            } catch (errors) {
                console.log("No such fav!", errors);
            };
        };
    }

    useEffect(() => {
        getData();
    }, []);

    const navigation = useNavigation();
    const navRecipe = (recipeId) => {
        navigation.navigate("Favorito", { recipeId });
    };

    return (
        <Center w={"85%"} ml={"7.5%"}>
            <Box w={"100%"} bg={"white"} rounded={'xl'}>
                <VStack m={"5%"} w={"90%"} space={5}>
                    <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Favoritos</Text>
                    {recipe.length > 0 ? (
                        recipe.map((recipes, index) => (
                            <>
                                <Pressable onPress={() => navRecipe(recipes.name)}>
                                    <Box w={"100%"}>
                                        <HStack space={4}>
                                            <Image key={index} source={{
                                                uri: recipes.img
                                            }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 125, height: 125 }}  ></Image>
                                            <VStack flexWrap={'wrap'} maxW={'148px'}>
                                                <Text>{recipes.name}</Text>
                                                <Text>Categoria: {recipes.category}</Text>
                                                <Text>Tiempo: {recipes.time} min</Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                </Pressable>
                            </>
                        )))
                        : (
                            <>
                                <Text>Aun no tienes recetas favoritas...</Text>
                                <Text>Agrega aquellas recetas que te encantaria repetir</Text>
                            </>
                        )
                    }
                </VStack>
            </Box>
        </Center>
    )
};

export default () => {
    return (
        <View minH={'100%'} minW={"100%"} pt={"5%"} >
            <Favorites />
        </View>
    );
};
