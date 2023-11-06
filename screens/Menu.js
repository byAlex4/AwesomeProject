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
import { collection, query, getDocs } from "firebase/firestore";
import { Pressable } from 'react-native';

const Main = () => {
    const [recetas, setRecetas] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const fireCategory = [];
    const fireRecipe = [];
    const getDatos = async () => {
        const q = query(collection(firebase.db, "recipes")); //, where("capital", "==", true));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                fireRecipe.push(doc.data());
            });
            setRecetas(fireRecipe);
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }

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

    useEffect(() => {
        getDatos();
        getCategory();
    }, []);

    const navigation = useNavigation();
    const navRecipe = (recipeId) => {
        // Navega a la pantalla donde quieres mostrar los productos
        // y pasa el firebaseId como un parámetro
        navigation.navigate("Receta", { recipeId });
    };

    const navCategory = (categoryId) => {
        // Navega a la pantalla donde quieres mostrar los productos
        // y pasa el firebaseId como un parámetro
        navigation.navigate("Categoria", { categoryId });
    };

    return <Center w={"80%"} ml={"10%"}>
        <Box w={"100%"} bg={"white"} rounded={'xl'}>
            <VStack m={"5%"} w={"90%"}>
                <FormControl>
                    <Input variant="rounded" bg={"#e4e4e7"} minW={"100%"} fontSize={"lg"}
                        InputLeftElement={<Icon as={<AntDesign name="search1" size={24} />} ml="5"></Icon>}
                        placeholder="Buscar una receta"
                        InputRightElement={<Icon as={<AntDesign name="filter" size={24} />} mr="5"></Icon>} />
                </FormControl>
                <HStack mt={2}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        {categorias.map((category) => (
                            <VStack m={1} w={"75px"} h={"105px"}>
                                <Pressable onPress={() => navCategory(category.name)} key={category.name}>
                                    <Box bg={"#5249EB"} rounded={"xl"} w={"75px"} h={"75px"}>
                                        <Icon as={<MaterialCommunityIcons name={category.icon} />} color='white' size={60} m={"10%"} />
                                    </Box>
                                    <Text fontSize={"sm"} textAlign={"center"} color={"black"} >
                                        {category.name}
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
                <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Recomendaciones</Text>
                {recetas.map((recipes, index) => (
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
    </Center>;
}

export default function ({ props }) {
    return (
        <ScrollView flex={1} h={'100%'} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Main />
        </ScrollView>
    );
};
