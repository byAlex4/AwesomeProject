import React, { useEffect, useState } from 'react';
import {
    FormControl,
    Center,
    Input,
    Icon,
    VStack,
    Box,
    HStack,
    Text,
    Image,
    ScrollView
}
    from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import firebase from "../backend/Firebase";
import { collection, query, getDocs, onSnapshot, where } from "firebase/firestore";
import { Pressable } from 'react-native';

const Main = () => {
    const [recipe, setRecipe] = useState([]);
    const getData = async () => {
        if (search === "") {
            try {
                const colRef = collection(firebase.db, "recipes");
                const unsub = onSnapshot(colRef, (querySnapshot) => {
                    const fireRecipe = [];
                    querySnapshot.forEach((doc) => {
                        fireRecipe.push(doc.data());
                    });
                    setRecipe(fireRecipe);
                });
            } catch (errors) {
                console.log("No such document!", errors);
            }
        } else {
            try {
                const q = query(collection(firebase.db, 'recipes'), where('name', '==', search || ''));
                const unsub = onSnapshot(q, (querySnapshot) => {
                    const fireRecipe = [];
                    querySnapshot.docChanges().forEach((change) => {
                        if (change.type === 'added') {
                            fireRecipe.push(change.doc.data());
                        } if (change.type === 'modified') {
                            fireRecipe[change.oldIndex] = change.doc.data();
                        } if (change.type === 'removed') {
                            fireRecipe.splice(change.oldIndex, 1);
                        }
                    });
                    setRecipe(fireRecipe);
                });
            } catch (errors) {
                console.log("No such document!", errors);
            }
        }
    }

    const [category, setCategory] = useState([]);
    const fireCategory = [];
    const getCategory = async () => {
        const q = query(collection(firebase.db, "category"));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                fireCategory.push(doc.data());
            });
            setCategory(fireCategory);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }

    const navigation = useNavigation();
    const navRecipe = (recipeId) => {
        navigation.navigate("Receta", { recipeId });
    };

    const navCategory = (categoryId) => {
        navigation.navigate("Categoria", { categoryId });
    };

    const [search, setSearch] = useState("");
    const handleChange = (e) => {
        setSearch(e.target.value);
        getData();
    }

    useEffect(() => {
        getData();
        getCategory();
    }, []);

    return <Center w={"80%"} ml={"10%"}>
        <Box w={"100%"} bg={"white"} rounded={'xl'}>
            <VStack m={"5%"} w={"90%"}>
                <FormControl>
                    <Input variant="rounded" bg={"#e4e4e7"} minW={"100%"} fontSize={"lg"} onChange={handleChange}
                        InputLeftElement={<Icon as={<AntDesign name="search1" size={24} />} ml="5"></Icon>}
                        placeholder="Buscar una receta" />
                </FormControl>
                <HStack mt={2}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {category.map((categorys) => (
                            <VStack m={1} w={"75px"} h={"105px"}>
                                <Pressable onPress={() => navCategory(categorys.name)} key={categorys.name}>
                                    <Box bg={"#5249EB"} rounded={"xl"} w={"75px"} h={"75px"}>
                                        <Icon as={<MaterialCommunityIcons name={categorys.icon} />} color='white' size={60} m={"10%"} />
                                    </Box>
                                    <Text fontSize={"sm"} textAlign={"center"} color={"black"} >
                                        {categorys.name}
                                    </Text>
                                </Pressable>
                            </VStack>
                        ))}
                    </ScrollView>
                </HStack>
            </VStack>
        </Box>

        <Box w={"100%"} bg={"white"} rounded={'xl'} m={"5%"}>
            <VStack m={"5%"} w={"90%"} space={5}>

                <Text Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Recomendaciones</Text>
                {recipe.map((recipes, index) => (
                    <Pressable onPress={() => navRecipe(recipes.name)}>
                        <Box w={"100%"}>
                            <HStack space={4}>
                                <Image key={index} source={{
                                    uri: recipes.img
                                }} alt="Alternate Text" rounded={"lg"} size="2xl"
                                    style={{ width: 125, height: 125 }}  ></Image>
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
    </Center >;
}

export default function ({ props }) {
    return (
        <ScrollView flex={1} h={'100%'} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Main />
        </ScrollView>
    );
};
