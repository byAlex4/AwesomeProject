import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function Main({ props }) {
    const navigation = useNavigation();
    return <Center w={"80%"} ml={"10%"}>
        <Box w={"100%"} bg={"white"} rounded={'xl'} m={"5%"}>
            <VStack m={"5%"} w={"90%"} space={5}>
                <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Recomendaciones</Text>
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
                <Box w={"100%"}>
                    <HStack space={4}>
                        <Image source={{
                            uri: "https://i.postimg.cc/6pwt5jR7/tacos.jpg"
                        }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 125, height: 125 }}  ></Image>
                        <VStack>
                            <Text>Tacos de bistec</Text>
                            <Text>Categoria: Mexicana</Text>
                            <Text>Por: Veronica</Text>
                        </VStack>
                    </HStack>
                </Box>
                <Box w={"100%"}>
                    <HStack space={4}>
                        <Image source={{
                            uri: "https://i.postimg.cc/xCkSFWrZ/arroz.webp"
                        }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 125, height: 125 }}  ></Image>
                        <VStack>
                            <Text>Arrroz con leche</Text>
                            <Text>Categoria: Postres</Text>
                            <Text>Por: Alejandro</Text>
                        </VStack>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    </Center>;
}

export default function ({ props }) {
    return (
        <View minH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Main />
        </View>
    );
};
