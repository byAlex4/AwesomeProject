import React, { useState, useEffect } from 'react';
import {
    Box,
    HStack,
    VStack,
    Text,
    Pressable,
    Image,
    ScrollView
} from 'native-base';
import firebase from "../backend/Firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

function Favorites({ props }) {
    const [recipe, setRecipe] = useState([]);
    const firebaseFav = [];
    const getData = async () => {
        const user = firebase.auth.currentUser;
        if (user) {
            const uid = user.uid;
            const q1 = query(collection(firebase.db, "favorites"), where("iduser", "==", uid));
            try {
                const unsub1 = onSnapshot(q1, async (querySnapshot) => {
                    for (const change of querySnapshot.docChanges()) {
                        if (change.type === 'added') {
                            console.log('favs has been added')
                        } if (change.type === 'modified') {
                            console.log('favs has been modifed')
                        } if (change.type === 'removed') {
                            console.log('favs has been remoded')
                        }
                        const idrecipe = change.doc.data().idrecipe;
                        const q2 = query(collection(firebase.db, 'recipes'), where('name', '==', idrecipe));
                        const unsub2 = onSnapshot(q2, (querySnap) => {
                            querySnap.forEach((doc) => {
                                firebaseFav.push(doc.data());
                            });
                            setRecipe(firebaseFav)
                        });
                    }
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
        <Box w={"90%"} bg={"white"} rounded={'xl'} m={"5%"} minH={'90%'}>
            <VStack m={"5%"} w={"90%"} space={5}>
                <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Favoritos</Text>
                {recipe.map((recipes, index) => (
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
