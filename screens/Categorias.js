import React, { useEffect } from 'react';
import {
    FormControl,
    Center,
    Input,
    Icon,
    View,
    VStack,
    Box,
    HStack,
    Text,
    Image,
    ScrollView
}
    from 'native-base';
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import firebase from "../backend/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function Categorias({ props }) {
    const navigation = useNavigation();
    const route = useRoute();

    // Obtiene el firebaseId del parámetro de navegación
    const { firebaseId } = route.params;
    console.log('firebaseID:', firebaseId);
    // Usa el firebaseId para filtrar los datos de Firebase según la categoría
    const firebaseData = [];
    // Puedes usar una consulta como esta:
    const getDatos = async () => {
        const q = query(collection(firebase.db, "recipes"), where("category", "==", firebaseId));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log("categoria: => ", doc.data());
                firebaseData.push(doc.data());
                console.log(firebaseData);
            });
        } catch (errors) {
            console.log("No such document!", errors);
        }
    }
    useEffect(() => {
        getDatos();// Llama a la función getDatos
    }, []); // Pasa un arreglo vacío como segundo argumento para que solo se ejecute una vez

    return (
        <Center w={"80%"} ml={"10%"}>
            <Box w={"100%"} bg={"white"} rounded={'xl'} m={"5%"}>
                <VStack m={"5%"} w={"90%"} space={5}>
                    <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Recomendaciones</Text>
                    {firebaseData.map((item) => (
                        <Button key={item.name} onPress={() => alert("Presionaste el botón")} >
                            {/* Usa un componente Text para mostrar el id de Firebase dentro del botón */}
                            Hola{item.name}
                        </Button>
                    ))}

                    <Box w={"100%"}>
                        <HStack space={4}>
                            <Image source={{
                                uri: "https://i.postimg.cc/d1V71MPQ/Desayono.jpg"
                            }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 125, height: 125 }}  ></Image>
                            <VStack>
                                <Text>Hot cakes con huevo frito</Text>
                                <Text>Categoria: Desayuno</Text>
                                <Text>Por: Alejandro</Text>
                            </VStack>
                        </HStack>
                    </Box>
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
