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
    ScrollView,
    Fab
}
    from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Categorias from './Categorias';

function Main({ props }) {
    const navigation = useNavigation();
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
                        <VStack m={1} w={"75px"} h={"105px"}>
                            <Box bg={"#5249EB"} rounded={"xl"} w={"75px"} h={"75px"}>
                                <Icon as={<Ionicons name="ios-sunny-outline" />} color='white' size={60} m={"10%"} />
                            </Box>
                            <Text fontSize={"sm"} textAlign={"center"} color={"black"} >
                                Desayunos
                            </Text>
                        </VStack>
                        <VStack m={1} w={"75px"} h={"105px"}>
                            <Box bg={"#C857EA"} rounded={"xl"} w={"75px"} h={"75px"}>
                                <Icon as={<Ionicons name="md-moon-sharp" />} color='white' size={60} m={"10%"} />
                            </Box>
                            <Text fontSize={"sm"} textAlign={"center"} color={"black"} >
                                Cena
                            </Text>
                        </VStack>
                        <VStack m={1} w={"75px"} h={"105px"}>
                            <Box bg={"#9049EB"} rounded={"xl"} w={"75px"} h={"75px"}>
                                <Icon as={<MaterialCommunityIcons name="taco" />} color='white' size={60} m={"10%"} />
                            </Box>
                            <Text fontSize={"sm"} textAlign={"center"} color={"black"} >
                                Mexicana
                            </Text>
                        </VStack>
                        <VStack m={1} w={"75px"} h={"105px"}>
                            <Box bg={"#496AEB"} rounded={"xl"} w={"75px"} h={"75px"}>
                                <Icon as={<MaterialCommunityIcons name="hamburger" />} color='white' size={60} m={"10%"} />
                            </Box>
                            <Text fontSize={"sm"} textAlign={"center"} color={"black"} >
                                Rapida
                            </Text>
                        </VStack>
                        <VStack m={1} w={"75px"} h={"105px"}>
                            <Box bg={"#F06CD9"} rounded={"xl"} w={"75px"} h={"75px"}>
                                <Icon as={<MaterialCommunityIcons name="carrot" />} color='white' size={60} m={"10%"} />
                            </Box>
                            <Text fontSize={"sm"} textAlign={"center"} color={"black"} >
                                Saludable
                            </Text>
                        </VStack>
                    </ScrollView>
                </HStack>
            </VStack>
        </Box>

        <Box w={"100%"} bg={"white"} rounded={'xl'} m={"5%"}>
            <VStack m={"5%"} w={"90%"} space={5}>
                <Text fontSize={"2xl"} fontStyle={'italic'} fontWeight={'bold'}>Recomendaciones</Text>
                <ScrollView>
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
                        <HStack>
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
                        <HStack>
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
                    <Box w={"100%"}>
                        <HStack>
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
                    <Box w={"100%"}>
                        <HStack>
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
                    <Box w={"100%"}>
                        <HStack>
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
                </ScrollView>
            </VStack>
        </Box>
    </Center>;
}

const ButtonA = () => {
    return <Fab renderInPortal={false}
        style={{ backgroundColor: '#7356bf', position: 'relative', right: '0', top: '820px' }}
        shadow={2} size="sm"
        icon={<Icon color="white" as={AntDesign}
            name="plus" size="sm" />} />
}

export default function ({ props }) {
    return (
        <View flex={1} maxH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <ButtonA />
            <Main />
        </View>
    );
};
