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
import { AntDesign } from '@expo/vector-icons';

function Main({ props }) {
    const navigation = useNavigation();
    return <Center w={"80%"} ml={"10%"}>
        <Box w={"100%"} bg={"white"} rounded={'lg'}>
            <VStack m={"5%"} w={"90%"}>
                <FormControl>
                    <Input variant="rounded" bg={"gray"} minW={"100%"} fontSize={"lg"}
                        InputLeftElement={<Icon as={<AntDesign name="search1" size={24} color="black" />} ml="5"></Icon>}
                        placeholder="Buscar una receta"
                        InputRightElement={<Icon as={<AntDesign name="filter" size={24} color="black" />} mr="5"></Icon>} />
                </FormControl>
                <HStack>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <VStack m={"5%"} w={70} h={70}>
                            <Box m={"5%"} bg={"gray.200"} rounded={"xl"} width={"95%"} h={"95%"}>
                                <Icon m="1" as={<AntDesign name="user" color="black" />} size={50} />
                            </Box>
                            <Text m={"5%"} fontSize={"xs"} textAlign={"center"}>
                                Saludables
                            </Text>
                        </VStack>
                        <VStack m={"5%"} w={70} h={70}>
                            <Box m={"5%"} bg={"gray.200"} rounded={"xl"} width={"95%"} h={"95%"}>
                                <Icon m="1" as={<AntDesign name="user" color="black" />} size={50} />
                            </Box>
                            <Text m={"5%"} fontSize={"xs"} textAlign={"center"}>
                                Saludables
                            </Text>
                        </VStack>
                        <VStack m={"5%"} w={70} h={70}>
                            <Box m={"5%"} bg={"gray.200"} rounded={"xl"} width={"95%"} h={"95%"}>
                                <Icon m="1" as={<AntDesign name="user" color="black" />} size={50} />
                            </Box>
                            <Text m={"5%"} fontSize={"xs"} textAlign={"center"}>
                                Saludables
                            </Text>
                        </VStack>
                        <VStack m={"5%"} w={70} h={70}>
                            <Box m={"5%"} bg={"gray.200"} rounded={"xl"} width={"95%"} h={"95%"}>
                                <Icon m="1" as={<AntDesign name="user" color="black" />} size={50} />
                            </Box>
                            <Text m={"5%"} fontSize={"xs"} textAlign={"center"}>
                                Saludables
                            </Text>
                        </VStack>
                        <VStack m={"5%"} w={70} h={70}>
                            <Box m={"5%"} bg={"gray.200"} rounded={"xl"} width={"95%"} h={"95%"}>
                                <Icon m="1" as={<AntDesign name="user" color="black" />} size={50} />
                            </Box>
                            <Text m={"5%"} fontSize={"xs"} textAlign={"center"}>
                                Saludables
                            </Text>
                        </VStack>
                        <VStack m={"5%"} w={70} h={70}>
                            <Box m={"5%"} bg={"gray.200"} rounded={"xl"} width={"95%"} h={"95%"}>
                                <Icon m="1" as={<AntDesign name="user" color="black" />} size={50} />
                            </Box>
                            <Text m={"5%"} fontSize={"xs"} textAlign={"center"}>
                                Saludables
                            </Text>
                        </VStack>
                    </ScrollView>
                </HStack>
            </VStack>
        </Box>

        <Box w={"100%"} bg={"white"} rounded={'lg'} m={"5%"}>
            <VStack m={"5%"} w={"90%"}>
                <Text fontSize={"lg"}>Recomendaciones</Text>
                <Box w={"100%"}>
                    <HStack>
                        <Image source={{
                            uri: "https://i.postimg.cc/d1V71MPQ/Desayono.jpg"
                        }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 200, height: 200 }}  ></Image>
                        <VStack>
                            <HStack>
                                <Text>Desayuno</Text>
                            </HStack>
                            <Text>Por: Alejandro</Text>
                        </VStack>
                    </HStack>
                </Box>
                <Box w={"100%"} mt={"5%"}>
                    <HStack>
                        <Image source={{
                            uri: "https://i.postimg.cc/d1V71MPQ/Desayono.jpg"
                        }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 200, height: 200 }}  ></Image>
                        <VStack>
                            <HStack>
                                <Text>Desayuno</Text>
                            </HStack>
                            <Text>Por: Alejandro</Text>
                        </VStack>
                    </HStack>
                </Box>
                <Box w={"100%"} mt={"5%"}>
                    <HStack>
                        <Image source={{
                            uri: "https://i.postimg.cc/d1V71MPQ/Desayono.jpg"
                        }} alt="Alternate Text" rounded={"lg"} size="2xl" style={{ width: 200, height: 200 }}  ></Image>
                        <VStack>
                            <HStack>
                                <Text>Desayuno</Text>
                            </HStack>
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
        <View maxH={"100%"} minW={"100%"} pt={"5%"} bg={"gray.200"}>
            <Main />
        </View>
    );
};
